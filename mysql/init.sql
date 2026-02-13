CREATE DATABASE IF NOT EXISTS carecircle_auth_service;
CREATE DATABASE IF NOT EXISTS carecircle_user_profile;
CREATE DATABASE IF NOT EXISTS carecircle_communication_service;
CREATE DATABASE IF NOT EXISTS carecircle_matching_booking;

-- Force create/update user and grant all permissions
CREATE USER IF NOT EXISTS 'shiva'@'%' IDENTIFIED WITH mysql_native_password BY 'Shiva@123';
GRANT ALL PRIVILEGES ON *.* TO 'shiva'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
