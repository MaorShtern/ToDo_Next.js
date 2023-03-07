import React from 'react'
import styles from '../../styles/ToDo.module.css'
import { Card, Grid, Text, Button, Row } from "@nextui-org/react";
import Link from 'next/link';
import moment from 'moment'



export default function taskCard(props) {

    let { task } = props

    // console.log(task.isComplet ? "White" : "black");




    const Delete_Dialogue = () => {
        let userAnswer = confirm("Are you sure you want to delete this task??");
        // console.log(userAnswer, task.id);

        if (userAnswer)
            props.Delete_Task(task.id)
    }


    return (
        <>
            <div className={styles.Task_Card_Border}
                style={{
                    backgroundColor: task.isComplet ? "White" : "darkgrey"
                }}>
                <div style={{ padding: 7 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2><ins>{task.task_Name}</ins></h2>
                        <p> To Do By: {moment(task.date).format('DD/MM/YYYY')}</p>
                    </div>
                    <Card.Divider />
                    <div>
                        <p>{task.desc}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                        <Button size="sm">
                            <Link href={`http://localhost:3000/Com/${task.id}`} className={styles.Link_Style}>
                                Show Details
                            </Link>
                        </Button>
                        <Button size="sm" color="gradient" 
                        onPress={() => Delete_Dialogue()}
                        >Delete</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
