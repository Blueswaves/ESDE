const winston = require('winston');
const expressWinston = require('express-winston');
const express = require('express');
const app = express();
const port = 3001;

module.exports.logging = (req, res, next) => {

    expressWinston.logger({
        transports: [
            new winston.transports.Console()
        ],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        ),
        meta: false,
        msg: "HTTP  ",
        expressFormat: true,
        colorize: false,
        ignoreRoute: function (req, res) {
            return false;
        }


    })
}