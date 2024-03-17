using backend_cliente.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace backend_cliente.Controllers
{
    [EnableCors(origins: "*", headers:"*", methods: "GET, POST, PUT, DELETE, OPTIONS")]
    public class ClienteController : ApiController
    {
        // GET: api/Cliente
        public IEnumerable<Cliente> Get()
        {
            GestorCliente gCliente = new GestorCliente();
            return gCliente.getClientes();
        }

        // GET: api/Cliente/5
        public IEnumerable<Cliente> Get(int id)
        {
            GestorCliente gCliente = new GestorCliente();
            return gCliente.searchClienteId(id);
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
