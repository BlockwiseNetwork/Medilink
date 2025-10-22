import WalletClient from "@/components/wallet/WalletClient";

export default function WalletPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">My Wallet</h1>
        <p className="text-muted-foreground">
          Manage your funds and view transaction history.
        </p>
      </div>
      <WalletClient />
    </div>
  );
}
