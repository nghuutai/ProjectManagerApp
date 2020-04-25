const Project = require('../modules/Project');

exports.getProjects = async (req, res, next) => {
    try{
        const project = await Project.find();
        return res.status(200).json({
            success: true,
            count: project.length,
            data: project
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: "Server error"
        })
    }
}

exports.addProject = async (req, res, next) => {
    try{
        const project = await Project.create(req.body);
        return res.status(201).json({
            success: true,
            data: project
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
    
}

exports.updateProject = async (req, res, next) => {
    try {

        const projectUpdate = await Project.findByIdAndUpdate(
            { _id: req.params.id },
            { 
                name: req.body.name,
                description: req.body.description
            },
            {
                new: true,
                runValidators: true
            }
        )
        return res.status(201).json({
            success: true,
            data: projectUpdate
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

exports.assignMember = async (req, res, next) => {
    try {

        const assignMember = await Project.findByIdAndUpdate(
            { _id: req.params.id },
            { 
                members: req.body.members
            },
            {
                new: true,
                runValidators: true
            }
        )
        return res.status(201).json({
            success: true,
            data: assignMember
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if(!project) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }

        await project.remove();
        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}