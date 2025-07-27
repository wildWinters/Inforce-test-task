import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/shad-cn/dialog"

export function DialogWrapper() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30 dark:bg-background">
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="
              inline-flex items-center justify-center gap-2
              rounded-xl px-5 py-2.5
              font-semibold text-white tracking-wide
              bg-gradient-to-r from-blue-500 to-indigo-500
              shadow-md hover:shadow-lg
              transition-all duration-200
              hover:from-blue-600 hover:to-indigo-600
              focus-visible:outline-none
              focus-visible:ring-4 focus-visible:ring-indigo-500/30
            "
          >
            Add Product
          </button>
        </DialogTrigger>

        <DialogContent
          className="
            sm:max-w-[480px]
            rounded-2xl border-0 shadow-2xl
            bg-background/80 backdrop-blur-xl
            p-6
            data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
          "
        >
          <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Are you absolutely sure?
          </DialogTitle>

          <DialogDescription className="text-muted-foreground leading-relaxed">
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex justify-end gap-2">
            <button
              className="
                inline-flex items-center justify-center
                rounded-lg px-4 py-2 text-sm font-medium
                text-muted-foreground hover:text-foreground
                transition-colors
                hover:bg-muted/60
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              "
            >
              Cancel
            </button>

            <button
              className="
                inline-flex items-center justify-center
                rounded-lg px-4 py-2 text-sm font-semibold
                text-white
                bg-gradient-to-r from-red-500 to-rose-600
                shadow hover:shadow-md
                transition-all
                hover:from-red-600 hover:to-rose-700
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40
              "
            >
              Confirm
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
