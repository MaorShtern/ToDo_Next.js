import React, { useState } from 'react'
import moment from 'moment'
import { images } from '../../images'
import Image from 'next/image'
import styles from '../../styles/ToDo.module.css'
import { Card } from "@nextui-org/react";
import { Input } from '@nextui-org/react';
import { Switch } from "@nextui-org/react";
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Router from "next/router";



export default function addNewTask() {

    const [name, setName] = useState("No Name")
    const [description, setDescription] = useState("")
    const [isComplet, setIsComplet] = useState(true)
    const [date, setDate] = useState(new Date())
    // const [to_Do_By, setTo_Do_By] = useState("")

    
    const Save_New_Task = async () => {
        let timeStemp = new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        })
      
        let task ={
            "id":-1,
            "task_Name": name,
            "desc":description,
            "isComplet":isComplet,
            "date":moment(date).format('L'),
            "to_Do_By":timeStemp
        }

        const res = await fetch('http://localhost:3000/api/api',{
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newTask : task })
        })
        if (res.status === 200) {
            alert("Task added successfully")
            Router.back();
        }

    }



    // console.log(newTask);


    return (
        <>
            <div className={styles.Task_Page_Container}>
                <div className={styles.Task_Container}>
                    <div style={{ textAlign: 'center' }}>
                        <h1 ><ins>Add New Task</ins></h1>
                    </div>

                    <div style={{ paddingBottom: 30 }}>
                        <Card.Divider />
                    </div>

                    <div style={{ padding: 10 , paddingBottom:20}}>
                        <Input clearable bordered labelPlaceholder="Task Name"
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: 800 }}
                        />
                    </div>

                    <div style={{ padding: 10 }}>
                        <Input clearable bordered labelPlaceholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ width: 800 }}
                        />
                    </div>

                    <div style={{ padding: 10 }}>
                        Should the task be performed?
                        <div>
                            <Switch checked={isComplet}
                                onChange={() => setIsComplet(!isComplet)} 
                                size="xs"
                            />
                        </div>
                    </div>


                    <div className={styles.Edit_Date_And_Time}>
                        <div >
                            <h4>Date</h4>
                            <ReactDatePicker selected={date}
                            onChange={(date) => setDate(date)} 
                            />
                        </div>
                        <div>
                            <h4>Time</h4>
                            <p>*A timer must be added*</p>
                        </div>
                    </div>


                    <div className={styles.Edit_BTN_Container}>
                        <button
                        onClick={()=> Save_New_Task()}
                        >
                            <Image src={images.save} style={{ width: 50, height: 50 }} alt="Save" />
                        </button>
                    </div>

                </div>


            </div>
        </>
    )
}
