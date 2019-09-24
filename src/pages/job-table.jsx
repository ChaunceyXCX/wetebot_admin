import * as React from "react";
import AppTable from "./app-table";
import * as PubSub from "pubsub-js";
import Switch from "@material-ui/core/Switch";
import {Paper} from "@material-ui/core";
import "../config/config"


export default class JobTable extends React.Component {

    constructor() {
        super()
        this.state = {
            data: [],
            columns: [],
            checked: false,
            members: [],
        }
    }

    handleChange = (event) => {
        this.setState({
            checked: event.target.checked,
        })
    }

    onItemChange = (data) => {
        this.setState({data})
    }

    dataAdd = (rowData) => {

        let initHeaders = new Headers()
        initHeaders.append('Accept', 'application/json, text/plain, */*')
        initHeaders.append('Cache-Control', 'no-cache')
        initHeaders.append('Content-Type', 'application/json;charset=UTF-8')

        let body = JSON.stringify(rowData, null, 2)

        const init = {
            method: 'POST',
            headers: initHeaders,
            body
        }


        fetch(global.config.domain+global.config.port+'/job/add', init)
            .then(res => res.json())
            .then(dataBack => {
                if (dataBack.code===200){
                    const data = [...this.state.data];

                    data.push(dataBack.weJob);
                    this.setState({data})
                } else {
                    console.log('错误',dataBack)
                }

            }).catch(e => console.log('错误',e))
    }

    dataUpdate = (newData,oldData) => {

        let initHeaders = new Headers()
        initHeaders.append('Accept', 'application/json, text/plain, */*')
        initHeaders.append('Cache-Control', 'no-cache')
        initHeaders.append('Content-Type', 'application/json;charset=UTF-8')

        let body = JSON.stringify(newData, null, 2)

        const init = {
            method: 'POST',
            // credentials: 'include', // cookies
            // cache: 'no-cache ', // cookies
            headers: initHeaders,
            body
        }

        fetch(global.config.domain+ global.config.port +'/job/update',
            init
        )
            .then(res => res.json())
            .then(dataBack => {
                if(dataBack.code===200) {
                    const data = [...this.state.data];
                    data[data.indexOf(oldData)] = newData;
                    this.setState({data})
                }else {
                    console.log('错误',dataBack);
                    alert(dataBack)
                }

            }).catch(e => console.log('错误', e))
    }

    dataDlete = (rowData) => {

        let initHeaders = new Headers()
        initHeaders.append('Accept', 'application/json, text/plain, */*')
        initHeaders.append('Cache-Control', 'no-cache')
        initHeaders.append('Content-Type', 'application/json;charset=UTF-8')

        let body = JSON.stringify(rowData, null, 2)

        const init = {
            method: 'POST',
            // credentials: 'include', // cookies
            // cache: 'no-cache ', // cookies
            headers: initHeaders,
            body
        }

        fetch(global.config.domain+ global.config.port +'/job/remove',
            init
        )
            .then(res => res.json())
            .then(dataBack => {
                if (dataBack.code===200) {
                    const data = [...this.state.data];
                    data.splice(data.indexOf(rowData), 1);
                    this.setState({data})
                } else {
                    console.log("错误",dataBack);
                    alert(dataBack)
                }

            }).catch(e => console.log('错误', e))
    }

    jobSwitch = (rowData) => {
        let initHeaders = new Headers()
        initHeaders.append('Accept', 'application/json, text/plain, */*')
        initHeaders.append('Cache-Control', 'no-cache')
        initHeaders.append('Content-Type', 'application/json;charset=UTF-8')

        let state = rowData.triggerState==="PAUSED"?"RUNNING":"PAUSED";
        let newData = {...rowData};
        newData.triggerState = state;

        let body = JSON.stringify(rowData, null, 2)

        const init = {
            method: 'POST',
            headers: initHeaders,
            body
        }

        fetch(global.config.domain+ global.config.port +'/job/switch', init)
            .then(res => res.json())
            .then(dataBack => {
                if (dataBack.code===200){
                    const data = [...this.state.data];
                    data[data.indexOf(rowData)] = newData
                    this.setState({data})
                } else {
                    console.log('错误',dataBack);
                    alert(dataBack)
                }

            }).catch(e => console.log('错误',e))
    }


    componentDidMount() {

        let weIdLookUp = {};

        fetch(global.config.domain+ global.config.port +'/wechat/members')
            .then(res => res.json())
            .then(data => {
                this.setState({members: data},() => {
                    this.state.members.map((item,index) => (
                        weIdLookUp[item.UserName]=
                            item.NickName===''?item.Signature:item.NickName))
                    this.setState({
                        columns: [
                            // {title: 'Id', field: 'id', type: 'numeric'},
                            // { title: 'JobName', field: 'jobName' },
                            {title: 'JobGroup', field: 'jobGroup', editable: 'never'},
                            // {title: 'ToNickName', field: 'toNickName'},
                            { title: 'ToNickName', field: 'toWeId', lookup: weIdLookUp },
                            {title: 'Content', field: 'content'},
                            {
                                title: 'JobClassName',
                                field: 'jobClassName',
                                lookup: {
                                    "com.chauncey.WeTeBot.job.WeAlarmJob": "提醒任务",
                                    "com.chauncey.WeTeBot.job.WeatherJob": "天气任务"
                                },
                            },
                            {title: 'CronExpression', field: 'cronExpression'},
                            {title: 'TriggerState', field: 'triggerState', editable: 'onUpdate'},
                        ],
                    })
                    // this.state.members.map((item,index) => (console.log(item)))
                    // console.log(weIdLookUp)
                })
            }).catch(e => console.log('错误', e))



        fetch(global.config.domain+ global.config.port +'/job/list')
            .then(res => res.json())
            .then(data => {
                this.setState({data: data})
            }).catch(e => console.log('错误', e))

        this.setState(
            {
                editable: {
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                newData = {
                                    ...newData,
                                    jobGroup: 'admin',

                                }
                                this.dataAdd(newData)
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();

                                this.dataUpdate(newData,oldData);
                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                this.dataDlete(oldData)
                            }, 600);
                        }),
                },
                actions: [
                    rowData => ({
                        icon: () => (<Switch
                            color="primary"
                            checked={rowData.triggerState!=="PAUSED"}
                            // onChange={this.handleChange}
                            inputProps={{'aria-label': 'primary checkbox'}}
                        />),
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => {
                            this.jobSwitch(rowData);
                            // alert("是否暂停发送给" + rowData.toNickName+"的任务?")
                        },
                        disabled: rowData.triggerState==="COMPLETE",
                    }),
                ]
            }
        )


        PubSub.subscribe("table-change", (msg, data) => {
            this.setState(
                {
                    data: data,
                }
            )
        })
    }


    render() {
        return (<Paper>
                <AppTable {...this.state}/>
            </Paper>
        )
    }
}