import type { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handler.ts';
import type { HttpErrorStatus } from '../types/types.ts';
import { getMedellinWeather, getBogotaWeather, getAllWeathers } from '../services/api.service.ts';


// obtener todos los climas
export const allWeathers = async (res: Response) => {
    let statusCode: HttpErrorStatus = 500;
    try{
        getAllWeathers().then((response) => {
            res.send(response);
        })
    } catch(err) {
        handleHttp(res, "Something crashed your app", statusCode, err)
    }
}

// obtener el clima de Medellín
export const medellinWeather = async (res: Response) => {
    let statusCode: HttpErrorStatus = 500;
    try{
        getMedellinWeather().then((response) => {
            res.send(response);
        })
    } catch(err) {
        handleHttp(res, "Something crashed your app", statusCode, err)
    }
}

// obtener el clima de Bogotá
export const bogotaWeather = async (res: Response) => {
    let statusCode: HttpErrorStatus = 500;
    try{
        getBogotaWeather().then((response) => {
            res.send(response);
        })
    } catch(err) {
        handleHttp(res, "Something crashed your app", statusCode, err)
    }
}