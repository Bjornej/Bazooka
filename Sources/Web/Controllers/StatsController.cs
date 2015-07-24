﻿namespace Web.Controllers
{
    using DataAccess.Read;
    using System;
    using System.Linq;
    using System.Web.Http;

    public class StatsController : ApiController
    {
        private ReadContext db = new ReadContext();

        [HttpGet]
        public object Statistics(DateTime startDate)
        {
            var deploys = db.Deployments
                            .Where(x => x.StartDate > startDate)
                            .GroupBy(x => new { x.Name, x.Configuration })
                            .Select(x => new { x.Key.Name, x.Key.Configuration, Count = x.Count() })
                            .OrderByDescending(x => x.Count)
                            .ToList();

            var users = db.Deployments
                          .Where(x => x.StartDate > startDate)
                          .GroupBy(x => new { x.UserName })
                          .Select(x => new { x.Key.UserName, Count = x.Count() })
                          .OrderByDescending(x => x.Count)
                          .ToList();

            return new { Deploys = deploys, Users = users };
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
