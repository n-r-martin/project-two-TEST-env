const router = require('express').Router();
const Project = require('../models/Project');

// route to get all dishes
router.get('/', async (req, res) => {
    try {
        const projectData = await Project.findAll();
        const projects = projectData.map((project) => project.get({ plain: true }));

        res.status(200).render('homepage', {projects})
    } catch (err) {
        res.status(404)
    }
});
  