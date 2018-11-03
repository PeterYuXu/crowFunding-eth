import React from 'react'
import {Card, List, Image, Progress} from 'semantic-ui-react'


const CardExampleColored = (props) => {
    const {details} = props;

    let cardsFinal = details.map(detail => {
        return <CardExampleCard key={detail.funding} detail={detail}/>
    })


    return (
        <Card.Group itemsPerRow={4}>
            {
                cardsFinal
            }
        </Card.Group>
    )
}

const CardExampleCard = (props) => {
    const {detail} = props;

    const {funding, projectName, creator, supportBalance, targetBalance, endTime, currentBalance, investorCount} = detail;
    let percentage = (currentBalance / targetBalance) * 100;
    return (

        <div>
            <Card>
                <Image src='/images/matthew.jpeg'/>
                <Card.Content>
                    <Card.Header>{projectName}</Card.Header>
                    <Card.Meta>
                        <span>剩余时间:{endTime}秒</span>
                        <Progress indicating percent={percentage} size='small' progress/>
                    </Card.Meta>
                    <Card.Description>不容错过</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <List divided horizontal style={{display: 'flex', justifyContent: 'space-around'}}>
                        <List.Item>
                            <List.Content>
                                <List.Header>已筹</List.Header>
                                <List.Description>{currentBalance}wei</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>已达</List.Header>
                                <List.Description>{percentage}%</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>参与人数</List.Header>
                                <List.Description>{investorCount}人</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </Card.Content>
            </Card>
        </div>
    )
}

export default CardExampleColored;