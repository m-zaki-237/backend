import mongoose from "mongoose";
import uploadFile from "../services/storage.service.js";
import musicModel from "../models/music.model.js";
import albumModel from "../models/album.model.js";
import jwt from 'jsonwebtoken'
export const createMusic = async (req, res) => {
    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
      title,
      artist: req.user.id,
      uri: result.url,
    });
    res.status(201).json({
      message: "Music created successfully",
      music: {
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: music.artist,
      },
    });
};

export const createAlbum = async (req,res) => {
    const {title, musics} = req.body
    const album = await albumModel.create({
      title,
      artist: req.user.id,
      musics: musics
    })

    res.status(201).json({
      message: "Album Created",
      album: {
        id: album._id,
        title: album.title,
        artist: album.artist,
        music: album.musics
      }
    })
}

export const getAllMusics = async (req,res) => {
  const musics = await musicModel
  .find()
  .limit(1)
  .populate("artist")
  res.status(200).json({
    message: "Musics fetched successfully",
    musics: musics
  })
}

export const getAllAlbums = async (req,res) => {
  const albums = await albumModel.find().select("artist title").populate("artist", "email username")
  res.status(200).json({
    message: "Albums fetched successfully",
    albums: albums
  })
}

export const getAlbumById = async (req,res) => {
  const albumId = req.params.albumId
  const album = await albumModel.findById(albumId).populate("artist", "email username").populate("musics")
  res.status(200).json({
    message: "Album fetched successfully",
    album: album
  })
}