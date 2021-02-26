.PHONY:  reset-db-to-defaults
##
## Note:
## Hasura commands require the flag --admin-secret defined in the .env file
## or via the flag in the command itself.
##

# Main commands
# ----------------------------------------------------------------
reset-db-to-defaults:
	@echo "====================================================================="
	@echo " ERD - eScience Center "
	@echo "====================================================================="
	@echo "=> Restore/install Sample DB. All local database changes will be lost: "
	@read -p "Continue to restore the data? [y/N]" -n 1 -r; \
        if [[ $$REPLY =~ ^[Yy] ]]; \
        then \
            make restore-data; \
        fi

restore-data:
	@docker-compose down
	@docker-compose up -d postgres
	@echo "Waking up postgres container..."
	@ping -t 5 google.com >nul
	docker exec -i erd-postgres dropdb -U postgres postgres
	docker exec -i erd-postgres createdb -U postgres postgres
	docker-compose up -d
	@echo "Waking up hasura container..."
	@ping -t 5 google.com >nul
	docker exec -i erd-postgres psql --username postgres postgres < ./CI/dev-data-dump.sql
	npx yarn hasura-metadata-apply
	@rm nul
	@echo "DONE."


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

