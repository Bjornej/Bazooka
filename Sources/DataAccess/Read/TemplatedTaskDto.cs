﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Read
{
    public class TemplatedTaskDto
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual int EnviromentId { get; set; }

        public virtual int ApplicationId { get; set; }

        public virtual int AgentId { get; set; }


        public virtual int Position { get; set; }
    }
}