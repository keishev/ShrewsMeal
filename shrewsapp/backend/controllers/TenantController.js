const { getTotalTenants } = require ('../entity/user');

exports.fetchTotalTenants = async (req, res) => {
    try {
        const totalTenants = await getTotalTenants ();
        return res.json ({ Status: "Success", totalTenants: totalTenants[0].totalTenants});
    } catch (error) {
        console.error ('Error fetching total tenants:', error);
        throw error;
    }
}
