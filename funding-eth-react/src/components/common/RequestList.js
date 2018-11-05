import React from 'react'
import {Table,Button} from 'semantic-ui-react'

const TableExamplePagination = (props) => {
    const {requestDetails,investorCount, pageKey, onApproveClick, onFinalizeClick} = props

    let final = requestDetails.map((request, index) => {
        let {0:purpose, 1:cost, 2:shopAddress, 3:isVoted, 4:voteCount, 5:status} = request
        let isCompleted = false
        let showStatus

        console.log('赞同人数:', voteCount, '总人数:', investorCount)
        if (status === 2) {
            isCompleted = true;
            showStatus = '已完成!';
        } else if (investorCount > voteCount * 2 ) {
            showStatus = '投票中...';
        } else {
            //待解决，传递一个investor总量过来
            showStatus = '已批准!';
        }
        return (
            <Table.Row key={index}>
                <Table.Cell>{purpose}</Table.Cell>
                <Table.Cell>{cost}</Table.Cell>
                <Table.Cell>{shopAddress}</Table.Cell>
                <Table.Cell>{voteCount}</Table.Cell>
                <Table.Cell>{status}</Table.Cell>
                <Table.Cell>
                    {
                        (pageKey === 2) ? (
                            <Button disabled={voteCount * 2 < investorCount ||isCompleted} onClick={() => onFinalizeClick(index)}>支付</Button>
                        ) : (
                            <Button disabled={isVoted || isCompleted} onClick={() => onApproveClick(index)}>批准</Button>
                        )
                    }
                </Table.Cell>
            </Table.Row>
        )
    })

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>花费描述</Table.HeaderCell>
                    <Table.HeaderCell>花费金额</Table.HeaderCell>
                    <Table.HeaderCell>商家地址</Table.HeaderCell>
                    <Table.HeaderCell>当前赞成人数</Table.HeaderCell>
                    <Table.HeaderCell>当前状态</Table.HeaderCell>
                    <Table.HeaderCell>操作</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    final
                }
            </Table.Body>
        </Table>
    )
}

export default TableExamplePagination