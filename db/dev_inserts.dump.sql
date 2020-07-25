--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2 (Debian 12.2-2.pgdg100+1)
-- Dumped by pg_dump version 12.2 (Debian 12.2-2.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: event_log; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: event_invocation_logs; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: hdb_table; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('information_schema', 'tables', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('information_schema', 'schemata', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('information_schema', 'views', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('information_schema', 'columns', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_table', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_primary_key', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_foreign_key_constraint', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_relationship', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_permission_agg', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_computed_field', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_check_constraint', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_unique_constraint', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_remote_relationship', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'event_triggers', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'event_log', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'event_invocation_logs', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_function', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_function_agg', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'remote_schemas', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_version', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_query_collection', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_allowlist', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_custom_types', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_action_permission', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_action', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_action_log', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_role', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_cron_triggers', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_cron_events', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_cron_event_invocation_logs', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_scheduled_events', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('hdb_catalog', 'hdb_scheduled_event_invocation_logs', '{"custom_root_fields": {}, "custom_column_names": {}}', true, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('public', 'roles', '{"custom_root_fields": {}, "custom_column_names": {}}', false, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('public', 'users', '{"custom_root_fields": {}, "custom_column_names": {}}', false, false);
INSERT INTO hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) VALUES ('public', 'yet', '{"custom_root_fields": {}, "custom_column_names": {}}', false, false);


--
-- Data for Name: event_triggers; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: hdb_action; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: hdb_action_log; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: hdb_action_permission; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: hdb_query_collection; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: hdb_allowlist; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: hdb_computed_field; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: hdb_cron_triggers; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: hdb_cron_events; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: hdb_cron_event_invocation_logs; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: hdb_custom_types; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

INSERT INTO hdb_catalog.hdb_custom_types (custom_types) VALUES ('{"enums": null, "objects": null, "scalars": null, "input_objects": null}');


--
-- Data for Name: hdb_function; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: hdb_permission; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

INSERT INTO hdb_catalog.hdb_permission (table_schema, table_name, role_name, perm_type, perm_def, comment, is_system_defined) VALUES ('public', 'yet', 'public', 'select', '{"filter": {}, "columns": [], "computed_fields": [], "allow_aggregations": false}', NULL, false);


--
-- Data for Name: hdb_relationship; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_table', 'detail', 'object', '{"manual_configuration": {"remote_table": {"name": "tables", "schema": "information_schema"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_table', 'primary_key', 'object', '{"manual_configuration": {"remote_table": {"name": "hdb_primary_key", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_table', 'columns', 'array', '{"manual_configuration": {"remote_table": {"name": "columns", "schema": "information_schema"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_table', 'foreign_key_constraints', 'array', '{"manual_configuration": {"remote_table": {"name": "hdb_foreign_key_constraint", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_table', 'relationships', 'array', '{"manual_configuration": {"remote_table": {"name": "hdb_relationship", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_table', 'permissions', 'array', '{"manual_configuration": {"remote_table": {"name": "hdb_permission_agg", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_table', 'computed_fields', 'array', '{"manual_configuration": {"remote_table": {"name": "hdb_computed_field", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_table', 'check_constraints', 'array', '{"manual_configuration": {"remote_table": {"name": "hdb_check_constraint", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_table', 'unique_constraints', 'array', '{"manual_configuration": {"remote_table": {"name": "hdb_unique_constraint", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'event_triggers', 'events', 'array', '{"manual_configuration": {"remote_table": {"name": "event_log", "schema": "hdb_catalog"}, "column_mapping": {"name": "trigger_name"}}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'event_log', 'trigger', 'object', '{"manual_configuration": {"remote_table": {"name": "event_triggers", "schema": "hdb_catalog"}, "column_mapping": {"trigger_name": "name"}}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'event_log', 'logs', 'array', '{"foreign_key_constraint_on": {"table": {"name": "event_invocation_logs", "schema": "hdb_catalog"}, "column": "event_id"}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'event_invocation_logs', 'event', 'object', '{"foreign_key_constraint_on": "event_id"}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_function_agg', 'return_table_info', 'object', '{"manual_configuration": {"remote_table": {"name": "hdb_table", "schema": "hdb_catalog"}, "column_mapping": {"return_type_name": "table_name", "return_type_schema": "table_schema"}}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_action', 'permissions', 'array', '{"manual_configuration": {"remote_table": {"name": "hdb_action_permission", "schema": "hdb_catalog"}, "column_mapping": {"action_name": "action_name"}}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_role', 'action_permissions', 'array', '{"manual_configuration": {"remote_table": {"name": "hdb_action_permission", "schema": "hdb_catalog"}, "column_mapping": {"role_name": "role_name"}}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_role', 'permissions', 'array', '{"manual_configuration": {"remote_table": {"name": "hdb_permission_agg", "schema": "hdb_catalog"}, "column_mapping": {"role_name": "role_name"}}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_cron_triggers', 'cron_events', 'array', '{"foreign_key_constraint_on": {"table": {"name": "hdb_cron_events", "schema": "hdb_catalog"}, "column": "trigger_name"}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_cron_events', 'cron_trigger', 'object', '{"foreign_key_constraint_on": "trigger_name"}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_cron_events', 'cron_event_logs', 'array', '{"foreign_key_constraint_on": {"table": {"name": "hdb_cron_event_invocation_logs", "schema": "hdb_catalog"}, "column": "event_id"}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_cron_event_invocation_logs', 'cron_event', 'object', '{"foreign_key_constraint_on": "event_id"}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_scheduled_events', 'scheduled_event_logs', 'array', '{"foreign_key_constraint_on": {"table": {"name": "hdb_scheduled_event_invocation_logs", "schema": "hdb_catalog"}, "column": "event_id"}}', NULL, true);
INSERT INTO hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) VALUES ('hdb_catalog', 'hdb_scheduled_event_invocation_logs', 'scheduled_event', 'object', '{"foreign_key_constraint_on": "event_id"}', NULL, true);


--
-- Data for Name: hdb_remote_relationship; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: hdb_scheduled_events; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: hdb_scheduled_event_invocation_logs; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: hdb_schema_update_event; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

INSERT INTO hdb_catalog.hdb_schema_update_event (instance_id, occurred_at, invalidations) VALUES ('df610aef-4840-4be7-9b4e-90a0f3e735f5', '2020-07-25 21:02:37.364215+00', '{"metadata":false,"remote_schemas":[]}');


--
-- Data for Name: hdb_version; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

INSERT INTO hdb_catalog.hdb_version (hasura_uuid, version, upgraded_on, cli_state, console_state) VALUES ('42503795-2178-4703-9cf5-c6000eb9e0e8', '36', '2020-07-25 21:00:37.518958+00', '{}', '{"telemetryNotificationShown": true}');


--
-- Data for Name: migration_settings; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

INSERT INTO hdb_catalog.migration_settings (setting, value) VALUES ('migration_mode', 'true');


--
-- Data for Name: remote_schemas; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

INSERT INTO hdb_catalog.schema_migrations (version, dirty) VALUES (1595707571646, false);
INSERT INTO hdb_catalog.schema_migrations (version, dirty) VALUES (1595707633636, false);
INSERT INTO hdb_catalog.schema_migrations (version, dirty) VALUES (1595707751410, false);
INSERT INTO hdb_catalog.schema_migrations (version, dirty) VALUES (1595707770054, false);
INSERT INTO hdb_catalog.schema_migrations (version, dirty) VALUES (1595707801525, false);
INSERT INTO hdb_catalog.schema_migrations (version, dirty) VALUES (1595710945241, false);


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles (value, comment) VALUES ('admin', 'Super admin');
INSERT INTO public.roles (value, comment) VALUES ('user', 'Logged user');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: yet; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: remote_schemas_id_seq; Type: SEQUENCE SET; Schema: hdb_catalog; Owner: postgres
--

SELECT pg_catalog.setval('hdb_catalog.remote_schemas_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: yet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.yet_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

