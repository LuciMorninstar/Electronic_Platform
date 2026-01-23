import React from 'react'
import { useUserStore } from '../../utils/useUserStore'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import Loading from '../../components/loading';
import { FaDeleteLeft } from "react-icons/fa6";
import { Loader } from 'lucide-react';


export default function AdminUsersPage() {

    const users = useUserStore((state)=>state.users);
    const gettingUsers = useUserStore((state)=>state.gettingUsers);
    const deleteUser = useUserStore((state)=>state.deleteUser);
    const deletingUser = useUserStore((state)=>state.deletingUser);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(users);
    

    const tableHeaders = ["UserID", "Full Name", "Email", "Role", "Date Joined" ,"Action"];

        // Debounce logic
        useEffect(() => {
            const timer = setTimeout(() => {
                if (searchTerm.trim() === "") {
                    setFilteredUsers(users);
                } else {
                    const term = searchTerm.toLowerCase();
                    const filtered = users.filter(
                        user =>
                            user._id.toLowerCase().includes(term) ||
                            user.fullName.toLowerCase().includes(term) ||
                            user.email.toLowerCase().includes(term)
                    );
                    setFilteredUsers(filtered);
                }
            }, 300); // 300ms debounce
    
            return () => clearTimeout(timer); // cleanup previous timer
        }, [searchTerm, users]);



        const deletingUserById = async (id)=>{
            try {
               const ok = window.confirm("Are you sure you want to delete this user?");

               if(ok) {
                  await deleteUser(id);

               }
               return;

              
                
            } catch (error) {
                console.log("Error deleting user", error);
                
            }

        }

    

  return (


        <section className="max-w-7xl mx-auto px-5 flex flex-col gap-8 items-center min-h-screen pb-50">
                <h3 className="uppercase w-full text-center translate-y-10">Users</h3>
                <span className='w-full text-right font-audiowide'>Total Users: {users.length}</span>
    
                <div className="relative w-max flex justify-center">
                    <span className="text-xl dark:text-white absolute top-1/2 right-3 -translate-y-1/2">
                        <FiSearch />
                    </span>
                    <input
                        className="searchbar"
                        type="text"
                        placeholder='Search By ID, Name or Email'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
    
                {gettingUsers ? (
                    <Loading />
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="w-full bg-tertiary-color dark:bg-dark-secondary-color rounded-2xl">
                                {tableHeaders.map((header, i) => (
                                    <th key={i} className="text-left py-3 px-4">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {(!filteredUsers || filteredUsers.length === 0) ? (
                                <tr>
                                    <td colSpan={tableHeaders.length} className="text-center py-10 text-red-600">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="group shadow-sm dark:even:bg-dark-search-bar-bg dark:odd:bg-dark-tertiary-color transition-all duration-300 ease-in">
                                        <td className="px-5 py-3 text-left group-hover:text-color-teal-500 duration-200 ease-in transition-all">{user._id}</td>
                                        <td className="px-5 py-3 text-left group-hover:text-color-teal-500 duration-200 ease-in transition-all">{user?.fullName || "N/A"}</td>
                                        <td className="px-5 py-3 text-left group-hover:text-color-teal-500 duration-200 ease-in transition-all">{user?.email || "N/A"}</td>
                                    
                                      
                                        <td className="px-5 py-3 text-left group-hover:text-color-teal-500 duration-200 ease-in transition-all">
                                            <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                                                user?.role === "user"
                                                    ? "bg-teal-500"
                                                    : user?.role === "admin"
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                            }`}>
                                                {user?.role || "N/A"}
                                            </span>
                                        </td>
                                    
                                        <td className="px-5 py-3 text-left group-hover:text-color-teal-500 duration-200 ease-in transition-all">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className="px-5 py-3 text-left group-hover:text-red-500 duration-200 ease-in transition-all">

                                        {
                                        deletingUser? <Loader/>:
                                      
                                        <button className = "cursor-pointer " onClick={() => deletingUserById(user._id)}>
                                           <FaDeleteLeft className='text-2xl' />
                                       
                                           </button>
                                            }

                                            </td>
                                    
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </section>


    





   
  )

}

