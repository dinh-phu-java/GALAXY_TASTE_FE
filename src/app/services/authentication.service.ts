import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    public host = environment.apiUrl;
    private token: string;
    private loggedInUsername: string;
    private jwtHelper = new JwtHelperService();
    constructor(private http: HttpClient) { }

    // public login(user: User): Observable<HttpResponse<User>> {
    //     // return this.http.post<User>(`${this.host}/user/login`, user, { observe: 'response' });
    //     return this.http.post<User>(`${this.host}/user/login`, user, { observe: 'response' });
    // }

    public register(user: User): Observable<User> {
        return this.http.post<User>(`${this.host}/user/register`, user);
    }

    public logOut(): void {
        this.token = null;
        
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        
    }

    public saveToken(token: string): void {
        this.token = token;
        localStorage.setItem('token', token);
    }

    public addUserToLocalCache(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    public getUserFormLocalCache(): User {
        return JSON.parse(localStorage.getItem('user'));
    }

    public loadToken(): void {
        this.token = localStorage.getItem('token');
    }
    public getToken(): string {
        return this.token;
    }

    public isUserLoggedIn(): boolean {
        this.loadToken();
        if (this.token != null && this.token !== '') {
            if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
                if (!this.jwtHelper.isTokenExpired(this.token)) {
                    this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
                    return true;
                }
            }
        } else {
            this.logOut();
        }
        return false;
    }

    public checkToken(token:string):boolean{
        if (token != null && token !== '') {
            if (this.jwtHelper.decodeToken(token).sub != null || '') {
                if (!this.jwtHelper.isTokenExpired(token)) {
                    this.loggedInUsername = this.jwtHelper.decodeToken(token).sub;
                    return true;
                }
            }
        }
        return false;
    }
}