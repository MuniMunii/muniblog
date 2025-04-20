"use client"
import React, { useState,useEffect } from "react";
import '../globals.css'
import { Suspense } from "react";
const TestComp= ()=>{
    return <>
    <div className="text-green-700 bg-amber-900 h-screen w-full">This is Index component</div>
    <div className="text-green-700 bg-amber-800 h-screen w-full">This is Index component</div>
    <div className="text-green-700 bg-amber-700 h-screen w-full">This is Index component</div>
   </>
}
export default function Index(){
    const [loading,setIsLoading]=useState<boolean>(true)
    const fetchComponent=async()=>{
        try{
        const res=await fetch('http://localhost:3000/')
    const data=await res.json()}catch(err){console.log(err)}finally{setIsLoading(false)}}
        useEffect(()=>{fetchComponent()},[])
    return <>{loading?<div>Loading...</div>:<TestComp/>}</>
}
