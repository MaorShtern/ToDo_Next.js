import { Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/ToDo.module.css'
import TaskCard from './taskCard'
import Router from "next/router";
// import addNewTask from './addNewTask';
import Link from 'next/link';


export default function list({ data }) {


    // console.log(data);


    const Delete_Task = async (task_id) => {
        // console.log(task_id);
        let res = await fetch('http://localhost:3000/api/api',
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: task_id })
            })
        // console.log(res);
        // let api_Data = await res.json()
        // let newData = api_Data.alter_Data
        // console.log(newData);

        if (res.status === 200) {
            alert("Task deleted successfully")
            Router.reload();
        }
    }


    let dataLayout = <table >
        <tbody>
            {
                data.map((task) =>
                    <tr key={task.id}>
                        <td key={task.id}> <TaskCard key={task.id} task={task} Delete_Task={Delete_Task} /></td>
                    </tr>
                )}

        </tbody>
    </table>



    return (
        <>
            <div className={styles.Header_Div}>
                <h1><ins>My ToDo List</ins></h1>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>

                <Link href="./Com/addNewTask" className={styles.Link_Style}>
                    <Button>+ Add New Task</Button>
                </Link>
            </div>

            <div className={styles.Task_Layout_Container}>
                {dataLayout}
            </div>
        </>
    )
}


