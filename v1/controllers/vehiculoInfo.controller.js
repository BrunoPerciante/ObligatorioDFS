import axios from "axios";

const NHTSA_BASE = "https://vpic.nhtsa.dot.gov/api/vehicles";

export const getMarcas = async (req, res) => {
  try {
    const response = await axios.get(`${NHTSA_BASE}/GetAllMakes?format=json`);
    const marcas = response.data.Results.map(m => ({
      id: m.Make_ID,
      nombre: m.Make_Name
    }));
    res.json({ message: "Marcas obtenidas", total: marcas.length, data: marcas });
  } catch (error) {
    console.error("Error al obtener marcas:", error);
    res.status(500).json({ message: "Error al obtener marcas desde NHTSA" });
  }
};

export const getModelosPorMarca = async (req, res) => {
  try {
    const { marca } = req.params;
    const response = await axios.get(
      `${NHTSA_BASE}/GetModelsForMake/${encodeURIComponent(marca)}?format=json`
    );
    const modelos = response.data.Results.map(m => ({
      id: m.Model_ID,
      nombre: m.Model_Name,
      marca: m.Make_Name
    }));
    if (modelos.length === 0) {
      return res.status(404).json({ message: `No se encontraron modelos para la marca: ${marca}` });
    }
    res.json({ message: "Modelos obtenidos", total: modelos.length, data: modelos });
  } catch (error) {
    console.error("Error al obtener modelos:", error);
    res.status(500).json({ message: "Error al obtener modelos desde NHTSA" });
  }
};

export const getModelosPorMarcaYAnio = async (req, res) => {
  try {
    const { marca, anio } = req.params;
    const response = await axios.get(
      `${NHTSA_BASE}/GetModelsForMakeYear/make/${encodeURIComponent(marca)}/modelyear/${anio}?format=json`
    );
    const modelos = response.data.Results.map(m => ({
      id: m.Model_ID,
      nombre: m.Model_Name,
      marca: m.Make_Name
    }));
    if (modelos.length === 0) {
      return res.status(404).json({ message: `No se encontraron modelos para ${marca} del año ${anio}` });
    }
    res.json({ message: "Modelos obtenidos", total: modelos.length, data: modelos });
  } catch (error) {
    console.error("Error al obtener modelos:", error);
    res.status(500).json({ message: "Error al obtener modelos desde NHTSA" });
  }
};