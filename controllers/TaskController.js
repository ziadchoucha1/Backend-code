const db_access = require('../db.js');
const db = db_access.db;

// Assign a task to a team member
const assignTask = (req, res) => {
    const { projectId, userId, taskName, description, dueDate } = req.body;

    if (!projectId || !userId || !taskName) {
        return res.status(400).json({ message: 'Project ID, User ID, and Task Name are required.' });
    }

    const query = `INSERT INTO TASK (PROJECTID, USERID, TASKNAME, DESCRIPTION, DUE_DATE) VALUES (?, ?, ?, ?, ?)`;
    const params = [projectId, userId, taskName, description || '', dueDate || null];

    db.run(query, params, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error assigning task', error: err.message });
        }
        res.status(201).json({ message: 'Task assigned successfully', taskId: this.lastID });
    });
};

// Request materials for a project
const requestMaterials = (req, res) => {
    const { projectId, materialName, quantity } = req.body;

    if (!projectId || !materialName || !quantity) {
        return res.status(400).json({ message: 'Project ID, Material Name, and Quantity are required.' });
    }

    const query = `INSERT INTO MATERIAL_REQUEST (PROJECTID, MATERIALNAME, QUANTITY) VALUES (?, ?, ?)`;
    const params = [projectId, materialName, quantity];

    db.run(query, params, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error requesting materials', error: err.message });
        }
        res.status(201).json({ message: 'Material request submitted', requestId: this.lastID });
    });
};

module.exports = {
    assignTask,
    requestMaterials
};
