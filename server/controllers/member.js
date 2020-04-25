const Member = require('../modules/Member')

exports.getMembers = async (req, res, next) => {
    try{
        const member = await Member.find();
        return res.status(200).json({
            success: true,
            count: member.length,
            data: member
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: "Server error"
        })
    }
}

exports.addMember = async (req, res, next) => {
    try{
        const { name, phone, birthday } = req.body;

        const member = await Member.create(req.body);
        return res.status(201).json({
            success: true,
            data: member
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
    
}

exports.updateMember = async (req, res, next) => {
    try{
        const { name, phone, birthday } = req.body;

        const memberUpdate = await Member.findByIdAndUpdate(
            { _id: req.params.id },
            { 
                name: req.body.name,
                phone: req.body.phone,
                birthday: req.body.birthday
            },
            {
                new: true,
                runValidators: true
            }
        )
        return res.status(201).json({
            success: true,
            data: memberUpdate
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}

exports.deleteMember = async (req, res, next) => {
    try {
        const member = await Member.findById(req.params.id);
        if(!member) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }

        await member.remove();
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