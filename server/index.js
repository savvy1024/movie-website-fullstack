import React from 'react'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from "http"
import mongoose from "mongoose"
import "dotenv/config"

const index = () => {
  return (
    <div>index</div>
  )
}

export default index