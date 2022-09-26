const cron = require("node-cron");
const moment = require("moment");

const Division = require("../models/division");

const cronJob = () => {
  cron.schedule(
    "0 */1 * * *", // "*/1 * * * *"
    async () => {
      const divisions = await Division.find({ active: true }).select(
        "createdAt period"
      );
      const today = moment();
      divisions.forEach(async (elem) => {
        switch (elem.period) {
          case "day":
            const createdDay = moment(elem.createdAt).add("1", "days");
            const diffDay = createdDay.diff(today, "hours");
            if (diffDay <= 0) {
              await Division.findOneAndUpdate(
                { _id: elem._id },
                { active: false }
              );
            }
            break;
          case "week":
            const createdWeek = moment(elem.createdAt).add("7", "days");
            const diffWeek = createdWeek.diff(today, "days");
            if (diffWeek <= 0) {
              await Division.findOneAndUpdate(
                { _id: elem._id },
                { active: false }
              );
            }
            break;
          case "month":
            const createdMonth = moment(elem.createdAt).add("1", "month");
            const diffMonth = createdMonth.diff(today, "days");
            if (diffMonth <= 0) {
              await Division.findOneAndUpdate(
                { _id: elem._id },
                { active: false }
              );
            }
            break;
        }
      });
      console.log("Cron executed");
    },
    { timezone: "Africa/Algiers", scheduled: true }
  );
};

module.exports = cronJob;
