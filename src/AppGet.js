import React, { useRef, useState } from "react";


function AppGet() {
    const baseURL = "https://reqres.in/api/posts";
    const get_id = useRef(null);
    const get_title = useRef(null);
    const [getResult, setGetResult] = useState(null);
    const formatResponse = (res) => {
        return JSON.stringify(res, null, 2);
    }
    async function getAllData() {
        //try {
        //const res = await fetch(`${baseURL}/tutorials`);
        const res = await fetch(`${baseURL}`);
        if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }
        const data = await res.json();
        
        const result = {
            //status: res.status + "-" + res.statusText,
            /*headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
            },*/
            //length: res.headers.get("Content-Length"),
            data: data,
        };
        beautyResult(result.data.data)        
    }
    async function getDataById() {
        const id = get_id.current.value;
        if (id) {
        try {
            //const res = await fetch(`${baseURL}/tutorials/${id}`);
            const res = await fetch(`${baseURL}/${id}`);
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
            }
            const data = await res.json();
            const result = {
            data: data,
            /*status: res.status,
            statusText: res.statusText,
            headers: {
                "Content-Type": res.headers.get("Content-Type"),
                "Content-Length": res.headers.get("Content-Length"),
            },*/
            };
            beautyResult(result.data);
        } catch (err) {
            setGetResult(err.message);
        }
        }
    }
    async function getDataByTitle() {
        const name = get_title.current.value;
        if (name) {
        try {
            // const res = await fetch(`${baseURL}/tutorials?title=${title}`);
            let url = new URL(`${baseURL}`);
            const params = { name: name };
            url.search = new URLSearchParams(params);
            const res = await fetch(url);
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
            }
            const data = await res.json();
            const result = {
            status: res.status + "-" + res.statusText,
            headers: {
                "Content-Type": res.headers.get("Content-Type"),
                "Content-Length": res.headers.get("Content-Length"),
            },
            data: data,
            };
            beautyResultTitle(result.data.data, name);
        } catch (err) {
            setGetResult(err.message);
        }
        }
    }
    const clearGetOutput = () => {
        get_id.current.value = '';
        get_title.current.value = '';
        document.querySelector('#printResult').innerHTML = '<BR><hr>';
    }
    function beautyResult(result){
        document.querySelector('#printResult').innerHTML = '<BR><hr>';
        Object.values(result).forEach(val => {
            if (val["id"]){
                console.log(val);
                document.querySelector('#printResult').innerHTML = document.querySelector('#printResult').innerHTML+`<div>Id: `+val["id"]+` Name: `+val["name"]+`</div>`;
            }
        });
    }
    function beautyResultTitle(result, name){
        document.querySelector('#printResult').innerHTML = '<BR><hr>';
        Object.values(result).forEach(val => {
            if (val["id"]){
                console.log(val["name"]+'-'+name);
                if (val["name"]===name){
                    console.log(val);
                    document.querySelector('#printResult').innerHTML = document.querySelector('#printResult').innerHTML+`<div>Id: `+val["id"]+` Name: `+val["name"]+`</div>`;
                }
            }
        });
    }
    return (
        <div className="card">
        <div className="card-header">Search</div>
        <div className="card-body">
            <div className="input-group input-group-sm m-1">
            <button className="btn btn-sm btn-primary m-1" onClick={getAllData}>Get All</button>
            <div className="input-group-append m-1">
                <input type="text" ref={get_id} className="form-control ml-2" placeholder="Id" />
                <button className="btn btn-secondary m-2" onClick={getDataById}>Get by Id</button>
            </div>
            <div className="input-group-append m-1">
                <input type="text" ref={get_title} className="form-control ml-2" placeholder="Title" />
                <button className="btn btn-secondary m-2" onClick={getDataByTitle}>Find By Title</button>
            </div>
            <button className="btn btn-warning m-1" onClick={clearGetOutput}>Clear</button>
            </div>
            <div id="printResult">
                { getResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{getResult}</pre></div> }
                { /*beautyResult(getResult) */}
            </div>
            
        </div>
        </div>
    );
}
export default AppGet;