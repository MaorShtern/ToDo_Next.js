import React, { useState } from 'react'
import styles from '../../styles/ToDo.module.css'
import { images } from '../../images'
import Image from 'next/image'
import { Card } from "@nextui-org/react";
import { Input } from '@nextui-org/react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Switch } from "@nextui-org/react";
import moment from 'moment'
import Router from "next/router";



export default function Task({ taskData }) {

  const [editFlag, setEditFlag] = useState(false)
  const [description, setDescription] = useState(taskData.desc)
  const [performeTask, setPerformeTask] = useState(taskData.isComplet)
  const [startDate, setStartDate] = useState(new Date(taskData.date));



  const Save_Task_Changes = async () => {

    let newTask = {
      "id": taskData.id,
      "task_Name": taskData.task_Name,
      "desc": description,
      "isComplet": performeTask,
      "date": startDate,
      "to_Do_By": taskData.to_Do_By
    }

    // console.log(newTask);
    let res = await fetch('http://localhost:3000/api/api',
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newTask: newTask })
      })

    if (res.status === 200) {
      alert("The task details have been successfully changed")
      // setEditFlag(false)
      Router.back();
    }
    else
      alert("ERROR")
  }



  if (!editFlag)
    return (
      <>
        <div className={styles.Task_Page_Container}>
          <div className={styles.Task_Container}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h1 ><ins>{taskData.task_Name}</ins></h1>
              <button onClick={() => setEditFlag(!editFlag)}>
                <Image src={images.edit} style={{ width: 50, height: 50 }} alt="" />
              </button>
            </div>
            <p>Description: {taskData.desc}</p>
            <p>To Do By: {moment(taskData.date).format('DD/MM/YYYY')} {taskData.to_Do_By}</p>
            {taskData.isComplet ? <p>The assignment is done!</p> : <p>The task still needs to be done!</p>}

          </div>
        </div>
      </>
    )

  else {
    return (
      <>
        <div className={styles.Task_Page_Container}>
          <div className={styles.Task_Container}>
            <div >
              <h1 ><ins>{taskData.task_Name}</ins></h1>
            </div>

            <div style={{ paddingBottom: 30 }}>
              <Card.Divider />
            </div>

            <div style={{ padding: 10 }}>
              <Input clearable bordered labelPlaceholder="Description" initialValue={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: 800 }}
              />
            </div>

            <div style={{ padding: 10 }}>
              Should the task be performed?
              <div>
                <Switch checked={performeTask}
                  onChange={() => setPerformeTask(!performeTask)} size="xs" />
              </div>
            </div>


            <div className={styles.Edit_Date_And_Time}>
              <div >
                <h4>Date</h4>
                <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
              </div>
              <div>
                <h4>Time</h4>
                <p>*A timer must be added*</p>
              </div>
            </div>


            <div className={styles.Edit_BTN_Container}>
              <button onClick={() => setEditFlag(!editFlag)}>
                <Image src={images.cansel} style={{ width: 50, height: 50 }} alt="Cansel" />
              </button>
              <div style={{ width: 100 }}></div>
              <button onClick={() => Save_Task_Changes()}>
                <Image src={images.save} style={{ width: 50, height: 50 }} alt="Save" />
              </button>
            </div>

          </div>


        </div>
      </>
    )
  }


}


export async function getStaticPaths() {
  let res = await fetch('http://localhost:3000/api/api', { method: "GET" })
  let data = await res.json()

  let pathsData = data.map((task) => {
    return {
      params: { 'taskid': JSON.stringify(task.id) }
    }
  })

  // console.log("pathsData= " + JSON.stringify(pathsData));
  return {
    paths: pathsData,
    fallback: 'blocking',
  }
}


export async function getStaticProps(context) {

  let { params } = context
  let id = parseInt(params.taskid)

  // console.log("id: " + id);

  let res = await fetch('http://localhost:3000/api/api',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    })

  let taskData = await res.json()

  return {
    props: { taskData },
  }
}
