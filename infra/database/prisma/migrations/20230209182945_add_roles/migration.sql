/*
  Warnings:

  - The values [ROLE_CREATE,ROLE_UPDATE,ROLE_DELETE,ROLE_LIST] on the enum `permissions_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `permissions` MODIFY `role` ENUM('LIST', 'CREATE', 'UPDATE', 'DELETE', 'USERS_LIST', 'USERS_CREATE', 'USERS_UPDATE', 'USERS_DELETE') NOT NULL;
