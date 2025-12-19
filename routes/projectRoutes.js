const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// ===============================
// @route   POST /api/projects
// @desc    Add new project (Admin)
// ===============================
router.post("/", async (req, res) => {
  try {
    const { name, description, image } = req.body;

    // Basic validation
    if (!name || !description) {
      return res.status(400).json({
        message: "Project name and description are required",
      });
    }

    const newProject = new Project({
      name,
      description,
      image,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({
      message: "Error creating project",
      error: error.message,
    });
  }
});

// ===============================
// @route   GET /api/projects
// @desc    Get all projects (Landing Page)
// ===============================
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching projects",
      error: error.message,
    });
  }
});

// ===============================
// @route   DELETE /api/projects/:id
// @desc    Delete project (Admin)
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.deleteOne();
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
