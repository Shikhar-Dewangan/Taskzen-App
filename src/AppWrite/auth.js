import { Client, Account, ID, } from 'appwrite';
import { config } from '../Config/config';
import React from 'react';


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
        console.log("AuthService initialized with Appwrite client:", this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            console.log("USER CREATED", userAccount)

            if (userAccount) {
                return await this.login({ email, password })
            } else {
                return userAccount;
            }

        } catch (error) {
            throw (error);
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            // Logged in
            return user;
        } catch (err) {
            // Not logged in
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession({
                email,
                password,
            })
            console.log("SESSION CREATED:", session);
            return session;
        } catch (error) {
            throw (error)
        }
    }

    async logout() {
        try {
            return await this.account.deleteSession('current');
        } catch (error) {
            if (error && error.message) {
                throw new Error(error.message);
            }
            throw new Error("Appwrite error");
        }
    }

}

const authService = new AuthService;

export default authService





