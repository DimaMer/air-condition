const {validateData} = require('../helpers/dataValidator');
const {Gallery} = require('../models/Gallery');
const {Item} = require('../models/Item');
const {unbindImageByAddress} = require('../helpers/unbindImages');
const {updateEntity} = require('../helpers/entityUpdater');

exports.getGalleryList = async (req, res) => {
    const filter = req.query ? req.query : ''
    const galList = await Gallery.find(filter)
    galList.length !== 0 ? res.status(200).json(galList) : res.status(404).json({query: filter});
}

exports.getSingleGallery = async (req, res) => {
    await validateData(req);
    const foundedImage = await Gallery.findById(req.query.id);
    res.status(200).json(foundedImage);
}

exports.addGallery = async (req, res) => {
    if (!req.files.photo) {
        const err = new Error('Виберіть фотографію!');
        err.status = 404;
        throw err;
    }
    const newGalleryItemData = req.body;

        const photoFile = req.files.photo;
        const photo = photoFile[0].path || photoFile;
        newGalleryItemData.photo = photo;
        const newGallery = await new Gallery(newGalleryItemData);
        if (!newGallery) {
            await unbindImageByAddress(photo);
            const err = new Error('Нову фотографію не додано!');
            err.status = 404;
            throw err;
        }
    newGallery.photo = req.files.photo.image.url
        const createdGallery = await newGallery.save();
        res.status(200).json(createdGallery);

}

exports.editGallery = async (req, res) => {
    await validateData(req);
    const { id } = req.body;
    const photoFile = req.files.photo;
    const photoOld = await Gallery.find({_id: id})
    const editedGallery = await updateEntity(id, req, Gallery);



    if (!editedGallery) {
        if (req.files.photo) {
            await unbindImageByAddress(photoFile[0].path || photoFile);
        }
        const error = new Error('Помилка при виконанні оновлення!');
        error.status = 500;
        throw error;
    } else if (photoFile&&photoOld[0]&&photoOld[0].photo) {
        await unbindImageByAddress(photoOld[0].photo);
    }
    res.status(200).send('Success!');
}

exports.deleteGallery = async (req, res) => {
    await validateData(req);
    const deletedGallery = await Gallery.findByIdAndDelete(req.query.id);
    await unbindImageByAddress(deletedGallery.photo);
    res.status(200).json(deletedGallery);
}
