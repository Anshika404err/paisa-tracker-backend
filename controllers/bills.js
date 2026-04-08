import billSchema from "../models/bills.js";

//controllers for bills and dues
export const addBill = async (req, res) => {
    const { userId, title, amount, currency, toWhom, recurring, dueDate } = req.body
    console.log(req.body);
    const bill = billSchema(
        req.body.dueItem
    )
    try {
        await bill.save()
        res.status(200).json({ bill })

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
    console.log(bill)

}

export const getBills = async (req, res) => {
    const userId = req.params.userId;
    try {
        const bill = await billSchema.find({ userId: userId })
        res.json({ bill })
    } catch (err) {
        res.json({ message: "No transactions found" })
    }

}

export const editBill = async (req, res) => {
    try {
        const { title, dueDate, amount, toWhom } = req.body;

        const updateFields = {
            title,
            dueDate,
            amount,
            toWhom
        };

        // Use findByIdAndUpdate with runValidators: true to ensure schema validation
        const bill = await billSchema.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }

        res.status(200).json(bill);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Cannot edit the bill", error: err.message });
    }
}
export const deleteBill = async (req, res) => {
    try {
        const bill = await billSchema.findByIdAndDelete(req.params.id);
        res.json({ message: "bill deleted" })
    } catch (err) {
        res.json({ message: "cannot delete the bill/bill not found" })

    }

}





































































