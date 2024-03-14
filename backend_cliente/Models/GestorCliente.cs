using Antlr.Runtime.Misc;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace backend_cliente.Models
{
    public class GestorCliente
    {
        public List<Cliente> getClientes()
        {
            List<Cliente> clientes = new List<Cliente>();
            string strConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(strConn))
            {
                conn.Open();

                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "Cliente_All";
                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    int id = dr.GetInt32(0);
                    string nombreCompleto = dr.GetString(1).Trim();
                    string identificacion = dr.GetString(2).Trim();
                    int edad = dr.GetInt32(3);
                    string genero = dr.GetString(4).Trim();
                    string estado = dr.GetString(5).Trim();
                    bool maneja = dr.GetBoolean(6);
                    bool usaLentes = dr.GetBoolean(7);
                    bool diabetico = dr.GetBoolean(8);
                    bool otraEnfermedad = dr.GetBoolean(9);
                    string descOtraEnfermedad = dr.GetString(10).Trim();

                    Cliente cliente = new Cliente(id, nombreCompleto, identificacion, edad, genero, estado, maneja, usaLentes, diabetico, otraEnfermedad, descOtraEnfermedad);

                    clientes.Add(cliente);
                }

                dr.Close();
                conn.Close();

            }

            return clientes;
        }

        public bool addCliente(Cliente cliente)
        {
            bool res = false;

            string strConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
            using (SqlConnection conn = new SqlConnection(strConn))
            {
                SqlCommand cmd = conn.CreateCommand();
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                cmd.CommandText = "Cliente_Add";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@nombreCompleto", cliente.nombreCompleto);
                cmd.Parameters.AddWithValue("@identificacion", cliente.identificacion);
                cmd.Parameters.AddWithValue("@edad", cliente.edad);
                cmd.Parameters.AddWithValue("@genero", cliente.genero);
                cmd.Parameters.AddWithValue("@estado", cliente.estado);
                cmd.Parameters.AddWithValue("@maneja", cliente.maneja);
                cmd.Parameters.AddWithValue("@usaLentes", cliente.usaLentes);
                cmd.Parameters.AddWithValue("@diabetico", cliente.diabetico);
                cmd.Parameters.AddWithValue("@otraEnfermedad", cliente.otraEnfermedad);
                cmd.Parameters.AddWithValue("@descripcionOtraEnfermedad", cliente.descripOtraEnfermedad);

                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    res = true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    res = false;
                    throw;
                }
                finally
                {
                    cmd.Parameters.Clear();
                    conn.Close();
                }
                return res;
            }
        }

        public bool updateCliente(int id, Cliente cliente)
        {
            bool res = false;

            string strConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
            using (SqlConnection conn = new SqlConnection(strConn))
            {
                SqlCommand cmd = conn.CreateCommand();
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                cmd.CommandText = "Cliente_Update";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@nombreCompleto", cliente.nombreCompleto);
                cmd.Parameters.AddWithValue("@identificacion", cliente.identificacion);
                cmd.Parameters.AddWithValue("@edad", cliente.edad);
                cmd.Parameters.AddWithValue("@genero", cliente.genero);
                cmd.Parameters.AddWithValue("@estado", cliente.estado);
                cmd.Parameters.AddWithValue("@maneja", cliente.maneja);
                cmd.Parameters.AddWithValue("@usaLentes", cliente.usaLentes);
                cmd.Parameters.AddWithValue("@diabetico", cliente.diabetico);
                cmd.Parameters.AddWithValue("@otraEnfermedad", cliente.otraEnfermedad);
                cmd.Parameters.AddWithValue("@descripcionOtraEnfermedad", cliente.descripOtraEnfermedad);

                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    res = true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    res = false;
                    throw;
                }
                finally
                {
                    cmd.Parameters.Clear();
                    conn.Close();
                }
                return res;
            }
        }

        public bool deleteCliente(int id, Cliente cliente)
        {
            bool res = false;

            string strConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
            using (SqlConnection conn = new SqlConnection(strConn))
            {
                SqlCommand cmd = conn.CreateCommand();
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                cmd.CommandText = "Cliente_Delete";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@id", id);

                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    res = true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    res = false;
                    throw;
                }
                finally
                {
                    cmd.Parameters.Clear();
                    conn.Close();
                }
                return res;
            }
        }


    }
}