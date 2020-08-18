"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var loginCheck = __importStar(require("connect-ensure-login"));
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("../../../projectentity/User");
var Project_1 = require("../../../projectentity/Project");
var Team_1 = require("../../../projectentity/Team");
var TeaModule_1 = require("../../../projectentity/TeaModule");
var TeaScript_1 = require("../../../projectentity/TeaScript");
var router = express.Router();
router.get("/create/project/:projectname", loginCheck.ensureLoggedIn({ redirectTo: "/signin" }), function (req, res, next) {
    // Sanatizing project name to project file name.
    var projectFile = req.params.projectname;
    projectFile = projectFile.toLowerCase().replace(/\W+/g, " ").split(" ").join("_");
    // Save both the project file and project name.
    req.session.projectFile = projectFile;
    req.session.projectName = req.params.projectname;
    req.session.save(function (err) {
        res.redirect("/dashboard");
    });
    // @ts-ignore
    typeorm_1.createConnection({
        "name": projectFile,
        "type": "sqlite",
        "database": "projects/" + projectFile + ".db",
        "synchronize": true,
        "logging": false,
        "entities": [
            User_1.User,
            Project_1.Project,
            Team_1.Team,
            TeaModule_1.TeaModule,
            TeaScript_1.TeaScript,
        ],
    }).then(function (connection) {
        // here you can start to work with your entities
        console.log('[DBSYSTEM] - Created project database: projects/' + projectFile + ".db - for project " + req.params.projectname);
    }).catch(function (error) { return console.log(error); });
    res.json({ success: true });
});
exports.default = router;
//# sourceMappingURL=tea.js.map