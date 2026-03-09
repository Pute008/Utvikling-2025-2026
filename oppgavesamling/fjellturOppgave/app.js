const express = require("express");
const app = express();

const cors = require("cors");

const Database = require("better-sqlite3");
const db = new Database("fjelltur.db");

const port = 3000;

