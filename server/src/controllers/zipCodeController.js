const ZipCode = require('../models/zipCode')

exports.registerNewZipCode = async (req, res) => {
    try {
        const { zipCode, district, city, adress, number, state } = req.body

        if (!zipCode) {
            return res.status(400).send({ error: 'Invalid zip code value' })
        }
        if (!district) {
            return res.status(400).send({ error: 'Invalid district value' })
        }
        if (!city) {
            return res
                .status(400)
                .send({ error: 'Invalid local value' })
        }
        if (!adress) {
            return res.status(400).send({ error: 'Invalid adress value' })
        }
        if (!number) {
            return res.status(400).send({ error: 'Invalid number value' })
        }
        if (!state) {
            return res.status(400).send({ error: 'Invalid state value' })
        }

        if (await ZipCode.findOne({ zipCode })) {
            return res.status(400).send({ error: 'Already exists' })
        }
        const user = await ZipCode.create(req.body)

        return res.send({ user })
    } catch (err) {
        return res.status(400).send({ error: 'Failed on registration' })
    }
}

exports.listAllUsers = async (req, res) => {
    try {
        const users = await ZipCode.find()
        return res.status(200).send(users)
    } catch (err) {
        return res.status(400).send({ error: 'Failed listing all' })
    }
}

exports.listOneUserById = async (req, res) => {
    try {
        const user = await ZipCode.findOne()
        return res.status(200).send(user)
    } catch (err) {
        return res.status(400).send({ error: 'Failed listing by id' })
    }
}

exports.editZipCodeRegister = async (req, res) => {
    try {
        const zipCodeUserId = req.params.id
        const { zipCode, district, city, adress, number, state } =
            req.body

        const zipCodeUserDetails = {
            zipCode,
            district,
            city,
            adress,
            number,
            state
        }
        if (!zipCodeUserId) {
            return res.status(422).send({ error: 'Zip code not found' })
        }

        const updateUserZipCode = await ZipCode.findByIdAndUpdate(
            { _id: zipCodeUserId },
            zipCodeUserDetails,
            { new: true }
        )

        updateUserZipCode.save(zipCodeUserId)
        return res.status(200).send({
            updateUserZipCode,
            message: 'Zip code details updated successfuly'
        })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Failed to update details' })
    }
}

exports.deleteZipCodeUserById = async (req, res) => {
    try {
        const zipCodeUserId = req.params.id
        const user = ZipCode.findById({ _id: zipCodeUserId })

        if (!user) {
            return res.status(400).send({ error: 'Failed on delete by id' })
        }
        await ZipCode.findOneAndDelete({ _id: zipCodeUserId })
        return res.status(200).send({ message: 'Removed successfuly' })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Failed deleting by id' })
    }
}
