import React, { useEffect } from 'react';

export default function Album() {
    
    
  useEffect(() => {
    // Fetch user data
    const get_token = localStorage.getItem("token");

    if (get_token) {
        fetch("/api/load/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: get_token,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
           
        });
    }
}, []);


    return (
        <div>
            {/* Your component JSX goes here */}
        </div>
    );
}