import express from 'express'
import { createAlbum, createMusic, getAlbumById, getAllAlbums, getAllMusics } from '../controllers/music.controller.js'
import multer from 'multer'
import { authArtistMiddleware, authUser } from '../middlewares/auth.middleware.js'
const upload = multer({
    storage: multer.memoryStorage()
})
const router = express.Router()

router.post('/create', authArtistMiddleware, upload.single("music") ,createMusic)
router.post('/album', authArtistMiddleware, createAlbum)
router.get('/', authUser, getAllMusics)
router.get('/albums', authUser, getAllAlbums)
router.get('/albums/:albumId', authUser, getAlbumById)

export default router