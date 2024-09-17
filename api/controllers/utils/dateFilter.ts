/*import { Express } from "express";
function dateFilter(fromDate: Express.Request, untilDate: Express.Request, newBody: any) {


 
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



}*/