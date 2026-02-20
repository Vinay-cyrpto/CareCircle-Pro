#!/bin/bash
set -e

mysql -u root -p"$MYSQL_ROOT_PASSWORD" <<-EOSQL
    CREATE DATABASE IF NOT EXISTS carecircle_auth_service;
    CREATE DATABASE IF NOT EXISTS carecircle_user_profile;
    CREATE DATABASE IF NOT EXISTS carecircle_communication_service;
    CREATE DATABASE IF NOT EXISTS carecircle_matching_booking;

    -- Create user using environment variables from .env
    CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'%' IDENTIFIED WITH mysql_native_password BY '${MYSQL_PASSWORD}';
    GRANT ALL PRIVILEGES ON *.* TO '${MYSQL_USER}'@'%' WITH GRANT OPTION;
    FLUSH PRIVILEGES;
EOSQL
