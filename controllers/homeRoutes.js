const router = require('express').Router();
const { Project, User } = require('../models');

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

module.exports = router;



router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
  