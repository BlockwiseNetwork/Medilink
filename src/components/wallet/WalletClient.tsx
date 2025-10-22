"use client";

import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowDownCircle, ArrowUpCircle, Send } from "lucide-react";
import { useState } from "react";

export default function WalletClient() {
  const { toast } = useToast();
  const [balance, setBalance] = useState(0.00);

  const handleDeposit = () => {
    // Simulate API call
    toast({ title: "Pending Transaction", description: "Deposit is being processed." });
    setTimeout(() => {
        const amount = 5000;
        setBalance(prev => prev + amount);
        toast({ title: "Transaction Successful", description: `₦${amount.toFixed(2)} has been added to your wallet.` });
    }, 2000);
  };
  
  const handleWithdraw = () => {
    toast({ title: "Pending Transaction", description: "Withdrawal is being processed." });
    setTimeout(() => {
      if(balance >= 1000) {
        const amount = 1000;
        setBalance(prev => prev - amount);
        toast({ title: "Transaction Successful", description: `₦${amount.toFixed(2)} has been withdrawn.` });
      } else {
        toast({ variant: "destructive", title: "Transaction Failed", description: "Insufficient balance." });
      }
    }, 2000);
  };

  const handleSend = () => {
    toast({ variant: "destructive", title: "Transaction Failed", description: "This feature is not yet implemented." });
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>Current Balance</CardDescription>
        <CardTitle className="text-4xl font-headline">
          ₦{balance.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button size="lg" onClick={handleDeposit}>
            <ArrowUpCircle className="mr-2 h-5 w-5" /> Deposit
          </Button>
          <Button size="lg" variant="secondary" onClick={handleWithdraw}>
            <ArrowDownCircle className="mr-2 h-5 w-5" /> Withdraw
          </Button>
          <Button size="lg" variant="secondary" onClick={handleSend}>
            <Send className="mr-2 h-5 w-5" /> Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
