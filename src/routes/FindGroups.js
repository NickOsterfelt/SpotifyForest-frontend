import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid"
import Api from "../engine/Api";
import FindGroupForm from "../components/FindGroupForm";
import GroupCard from "../components/GroupCard";
import GroupCardMatching from "../components/GroupCardMatching";

function FindGroups() {
    const [formData, setFormData] = useState({ search: "" });
    const [loading, setLoading] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [groups, setGroups] = useState([])
    const [userGroups, setUserGroups] = useState([]);
    
    function onJoinClick(groupId) {
        return async function () {
            Api.addUserToGroup(groupId, localStorage.getItem("userId"));
            let newUserGroups = userGroups;
            newUserGroups.push(groupId);
            localStorage.setItem("userGroups", JSON.stringify(newUserGroups));
            setUserGroups(newUserGroups)
            setGroups(groups);
        }
    }

    useEffect(function () {
        if(localStorage.getItem("userGroups")) {
            setUserGroups(JSON.parse(localStorage.getItem("userGroups")));
        }
    }, [setGroups, groups])

    useEffect(() => {
        async function search() {
            if (loading) {
                if (formData.searchType === "name") {
                    setLoading(false);
                    let res = await Api.searchGroupsByName(formData.search);
                    setGroups(res);
                    console.log(res);
                }
                if (formData.searchType === "track") {
                    setLoading(false);
                    let userTracks = JSON.parse(localStorage.getItem("userData")).userTracks;
                    let res = await Api.searchGroupsByTracks(userTracks);
                    setGroups(res);
                }
                if (formData.searchType === "artist") {
                    setLoading(false);
                    let userArtists = JSON.parse(localStorage.getItem("userData")).userArtists;
                    let res = await Api.searchGroupsByArtists(userArtists);
                    setGroups(res);
                }
            }
        }
        search();
    }, [loading, formData]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
        if (name === "searchType" && value === "name") {
            setShowSearchBox(true);
        }
        if ((name === "searchType") && (value === "artist" || value === "track")) {
            setShowSearchBox(false);
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setLoading(true);
    }
    const groupList = []
    if (groups.length > 0) {
        if (!showSearchBox) {
            for (let group of groups) {
                groupList.push(
                    <div key={uuid()}>
                        <GroupCardMatching
                            id={group.groupId}
                            groupName={group.groupName}
                            numUsers={group.numUsers}
                            matchScore={group.matchScore}
                            groupInfo={group.groupInfo}
                            canJoin = {userGroups.includes(group.groupId) ? false : true}
                            onJoinClick = {onJoinClick(group.groupId)}
                        />
                    </div>
                )
            }
        }
        else {
            for (let group of groups) {
                groupList.push(
                    <div key={uuid()}>
                        <GroupCard
                            id={group.groupId}
                            groupName={group.groupName}
                            numUsers={group.numUsers}
                            groupInfo={group.groupInfo}
                            canJoin={userGroups.includes(group.groupId) ? false : true}
                            onJoinClick={onJoinClick(group.groupId)}
                        />
                    </div>
                )
            }
        }
    }

    return (
        <div className="container mt-2 ">
            <div className="row d-flex justify-content-center">
                <div className="col-6 bg-secondary rounded text-light p-3 px-5 text-left">
                    <FindGroupForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        showSearchBox={showSearchBox}
                    />
                </div>
                <div className="col-10 bg-secondary rounded text-light p-3 my-3 text-left d-flex">
                    {groupList}
                </div>
            </div>
        </div>
    )

}

export default FindGroups;