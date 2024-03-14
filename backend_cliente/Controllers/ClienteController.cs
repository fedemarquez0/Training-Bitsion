﻿using backend_cliente.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace backend_cliente.Controllers
{
    public class ClienteController : ApiController
    {
        // GET: api/Cliente
        public IEnumerable<Cliente> Get()
        {
            GestorCliente gCliente = new GestorCliente();
            return gCliente.getClientes();
        }

        // GET: api/Cliente/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Cliente
        public bool Post([FromBody]Cliente cliente)
        {
            GestorCliente gCliente = new GestorCliente();
            bool res = gCliente.addCliente(cliente);

            return res;
        }

        // PUT: api/Cliente/5
        public bool Put(int id, [FromBody]Cliente cliente)
        {
            GestorCliente gCliente = new GestorCliente();
            bool res = gCliente.updateCliente(id, cliente);

            return res;
        }

        // DELETE: api/Cliente/5
        public bool Delete(int id)
        {
            GestorCliente gCliente = new GestorCliente();
            bool res = gCliente.deleteCliente(id);

            return res;
        }
    }
}