require('dotenv').config();

export const dbSettings = {
    CONNECTTION_STRING: process.env.DB_CONNECTION_STRING,
    DB_NAME: process.env.DB_NAME
};
export const hostSettings = {
    post: 8888
};