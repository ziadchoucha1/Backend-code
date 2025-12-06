const db_access = require('../db.js');
const db = db_access.db;

const createProject = (req, res) => {

    const {
        projectName,
        siteLocation,
        region,
        primaryLanguage,
        projectDescription,
        materialCost,
        laborCost,
        equipmentCost,
        permitCost,
        logisticsCost,
        currencyCode
    } = req.body;

    if (!projectName || !siteLocation || !region || !primaryLanguage || !projectDescription) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const query = `INSERT INTO PROJECT (
        PROJECTNAME, SITELOCATION, REGION, PRIMARYLANGUAGE, PROJECTDESCRIPTION,
        MATERIALCOST, LABORCOST, EQUIPMENTCOST, PERMITCOST, LOGISTICSCOST,
        CURRENCYCODE
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
        projectName, siteLocation, region, primaryLanguage, projectDescription,
        materialCost, laborCost, equipmentCost, permitCost, logisticsCost, currencyCode
    ];

    res.cookie('ProjectCreated', projectName, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true
    });

    db.run(
        query,
        params,
        function (err) {
            console.log(err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
    );
};

const retrieveProjectById = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM PROJECT WHERE ID = ?`;

    res.cookie('ProjectViewed', `PROJECT ID ${id}`, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true
    });

    db.get(query, [id], (err, row) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error fetching project' });
        }
        if (!row) return res.status(404).json({ message: 'Project not found' });

        return res.status(200).json({
            message: 'Project retrieved successfully',
            data: row
        });
    });
};

const retrieveAllProjects = (req, res) => {
    db.all('SELECT * FROM PROJECT', (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error retrieving projects' });
        }
        res.status(200).json({ message: 'Projects retrieved successfully', data: rows });
    });
};

module.exports = {
    retrieveAllProjects,
    createProject
};
