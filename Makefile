.PHONY: dev-docs dev-frontend
##
## Note:
## Hasura commands require the flag --admin-secret defined in the .env file
## or via the flag in the command itself.
##

# Main commands
# ----------------------------------------------------------------
install:
	$(MAKE) install_node_modules

dev:
	$(MAKE) up
	# Run concurrently
	make -j 2 dev-docs dev-frontend

dev-docs:
	cd docs && yarn dev

dev-frontend:
	cd frontend && yarn dev

dev-auth-server:
	echo "Runing auth server"



# Node modules
# ----------------------------------------------------------------
install_node_modules:
	cd frontend && yarn
	cd hasura && yarn
	cd auth-server && yarn
	cd docs && yarn

# Docker compose
# ----------------------------------------------------------------
up:
	docker-compose up --remove-orphans -d
#	sleep 10 # wait for the volumens and the container to be created

stop:
	docker-compose down

# remove docker volume for postgress => Warning, The DB data will be deleted.
remove-volume:
	docker volume rm nuxt-apollo-hasura_hasura_db_data


# Hasura
# ----------------------------------------------------------------
status:
	cd hasura && npx hasura migrate status

# Experimental Preview
# Squash multiple migrations into a single one
hasura-squash:
	cd hasura && npx hasura migrate squash --from <verion_number>

hasura-dump:
	# Hasura metadata and migrations come from the hasura-console files generation
	docker exec postgres-container pg_dump --column-inserts --data-only -U postgres postgres > db/dev_inserts.dump.sql
	docker exec postgres-container pg_dump -U postgres postgres > db/dev.dump.sql
	docker exec postgres-container pg_dumpall --clean -U postgres > db/dev.dumpall.sql
	curl -d '{"type" : "export_metadata","args": {"reload_remote_schemas": true}}' -H "x-hasura-admin-secret: adminpassword" -H "X-Hasura-Role: admin" http://localhost:4000/v1/query > ./db/hasura_schema.json
	# Format file
	cd client && npx prettier --write ../db/hasura_schema.json

# RESTORE FORM JSON FILE
# copy data in the database and then apply the hasura metadata (the file is minified in one line)
# ----------------------------------------------------------------
FILE=db/hasura_schema.json
SCHEMA=`cd client && npx json-minify ../$(FILE)`
hasura-restore:
	$(MAKE) up
	# The order is very important!
	# cat db/dev.dump.sql | docker exec -i postgres-container psql -U postgres -d postgres < db/dev.dump.sql
	 cat db/dev_inserts.dump.sql | docker exec -i postgres-container psql -U postgres -d postgres < db/dev_inserts.dump.sql
	$(MAKE) hasura-apply-metadata
	# cat db/dev.dumpall.sql | docker exec -i postgres-container psql -U postgres -d postgres < db/dev.dumpall.sql
	#$(MAKE) hasura-apply-migrations
	#curl --header "x-hasura-admin-secret: adminpassword" --data '{"type":"replace_metadata", "args":'$(cat ./hasura/schema.json)'}' http://localhost:4000/v1/query
	#curl -d '{"type":"replace_metadata", "args":'$(SCHEMA)'}' -H "x-hasura-admin-secret: adminpassword" -H "X-Hasura-Role: admin" http://localhost:4000/v1/query


# HASURA METADATA
################################
hasura-metadata-export:
	cd hasura && npx hasura metadata export --admin-secret adminpassword

hasura-apply-metadata:
	cd hasura && npx hasura metadata apply  --admin-secret adminpassword # --endpoint http://another-graphql-instance.herokuapp.com

hasura-apply-migrations:
	cd hasura && npx hasura metadata apply --admin-secret adminpassword

hasura-restore-full:
	cat db/dev.dumpall.sql | docker exec -i postgres-container psql -U postgres -d postgres < db/dev.dumpall.sql

