import * as express from 'express';
import Product from '../db/dbModels';
import fuzzySearch from '../middleware/fuzzySearch';

export async function getFilteredProds(req: express.Request, res: express.Response): Promise<void> {

    console.log("body: ", req.body);

    let fromDate = req.body.date
    if (req.body.fromDate) {
        fromDate = new Date(req.body.fromDate)
    } else { fromDate = null }
    let untilDate = req.body.date
    if (req.body.untilDate) {
        untilDate = new Date(req.body.untilDate)
    } else { untilDate = null }


    let fromDateTime = new Date(fromDate).getTime()
    let untilDateTime = new Date(untilDate).getTime()

    function removeTime(date: any) {
        // Create a new date object with the same year, month, and day
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    }

    try {

        let newBody: any
        newBody = await Product.find()

        if (req.body.name) {

            newBody = await fuzzySearch(req.body.name)
        }


        if (req.body.category) {

            let newArr = newBody.filter((value: any) => {
                return value = value.category === req.body.category

            })
            newBody = newArr
        }

        if (req.body.gender) {

            let newArr = newBody.filter((value: any) => {
                return value = value.gender === req.body.gender

            })
            newBody = newArr
        }

        if (fromDate && !untilDate) {

            let newArr = newBody.filter((value: any) => {

                value = removeTime(value.date)
                value = new Date(value).getTime()

                return value >= fromDateTime
            })
            newBody = newArr

        }

        if (!fromDate && untilDate) {

            let newArr = newBody.filter((value: any) => {

                value = removeTime(value.date)
                value = new Date(value).getTime()
                return value <= untilDateTime

            })
            newBody = newArr
        }

        if (fromDate && untilDate) {

            let newArr = newBody.filter((value: any) => {

                value = removeTime(value.date)
                value = new Date(value).getTime()
                if ((fromDateTime <= value) && (untilDateTime >= value)) {
                    return value
                }
            })
            newBody = newArr
        }

        res.send(newBody)
    } catch (error) {
        console.log(error);
    }
} 