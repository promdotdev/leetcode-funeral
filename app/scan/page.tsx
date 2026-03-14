import CardDecorations from '@/components/CardDecorations';

export default function ScanPage() {
  return (
    <CardDecorations>
      <div className="glass-card">
        <div className="glass-body text-[13px] leading-[1.5]">
          <p className="font-medium">How to scan a tag</p>

          <ol className="mt-4 list-decimal space-y-4 pl-5">
            <li>
              <span className="font-medium">Find a tagged item</span> — look for objects
              around the party with a small NFC sticker.
            </li>
            <li>
              <span className="font-medium">Unlock your phone</span> — NFC scanning
              requires the screen to be on and unlocked.
            </li>
            <li>
              <span className="font-medium">Hold your phone near the tag</span> — bring
              the top-back of your phone (where the NFC chip lives) close to the sticker.
            </li>
            <li>
              <span className="font-medium">Wait for the notification</span> — your phone
              will vibrate and a banner will appear. Tap it to open the dossier.
            </li>
            <li>
              <span className="font-medium">Review the clues</span> — tap &ldquo;Add to
              Session&rdquo; to save them to your evidence tracker.
            </li>
          </ol>

          <div className="mt-5 rounded-lg bg-black/10 px-4 py-3 text-[12px]">
            <p className="font-medium">Tip</p>
            <p className="mt-1">
              iPhone users: NFC is on by default — no app needed. Android users: make
              sure NFC is enabled in Settings.
            </p>
          </div>
        </div>
      </div>
    </CardDecorations>
  );
}
