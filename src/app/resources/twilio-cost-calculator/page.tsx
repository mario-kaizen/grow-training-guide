import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { TwilioCalculator } from "@/components/TwilioCalculator"

export default function TwilioCostCalculator() {
  return (
    <PageLayout
      title="Twilio Cost Calculator"
      description="Work out what an SMS campaign will cost before you send it, and see what emoji are doing to the bill."
      slug="/resources/twilio-cost-calculator"
    >
      <p>
        Every SMS sent from Grow is billed per segment, not per message. A
        segment is 160 characters. Write more than that and the message is cut
        into several segments, and each one is charged separately. A five
        segment message to 1,400 contacts is 7,000 billable segments, which is
        how a single blast turns into a few hundred dollars.
      </p>

      <p>
        Fill in the calculator below before any bulk send. Paste the message
        and it counts the segments for you, or switch to manual entry if you
        already know the count.
      </p>

      <TwilioCalculator />

      <h2>Why emoji cost so much more</h2>

      <p>
        Standard text is sent using an alphabet called GSM-7, which fits 160
        characters into a segment. The moment a message contains one character
        outside that alphabet, the whole message switches to a different
        encoding called UCS-2, and the segment shrinks from 160 characters to
        70. Nothing about the price per segment changes. The message simply
        needs far more segments to carry the same words.
      </p>

      <table>
        <thead>
          <tr>
            <th>Encoding</th>
            <th>Single message</th>
            <th>Per segment once it splits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>GSM-7</strong> (plain text)
            </td>
            <td>160 characters</td>
            <td>153 characters</td>
          </tr>
          <tr>
            <td>
              <strong>UCS-2</strong> (anything with an emoji)
            </td>
            <td>70 characters</td>
            <td>67 characters</td>
          </tr>
        </tbody>
      </table>

      <p>
        Take a 150 character message. As plain text it is one segment. Add a
        single emoji and it needs three segments, so it costs three times as
        much for one character. Two things stack up to cause that: the limit
        drops to 67 characters per segment, and most emoji count as two
        characters rather than one.
      </p>

      <Callout type="warning" title="It is not only emoji">
        <p>
          Curly quotes and long dashes are the ones that catch people out,
          because they look identical to the straight versions on screen. Copy
          from Word, Google Docs, Canva or ChatGPT and you will usually paste a
          curly apostrophe without noticing, and the whole message drops to 70
          characters per segment.
        </p>
        <p className="mt-2">
          Type your copy directly into Grow, or paste it through a plain text
          editor first. The calculator above will name any character that
          pushes the message onto UCS-2.
        </p>
      </Callout>

      <Callout type="tip" title="Paste the message the member will get">
        <p>
          Merge tags are replaced before the message is sent, so a template
          holding <code>{"{{contact.first_name}}"}</code> is not what gets
          counted. Twilio counts the finished message. Swap a realistic name in
          before you paste, and use your longest likely name rather than your
          shortest.
        </p>
        <p className="mt-2">
          Curly brackets are also worth knowing about: they are legal in GSM-7
          but each one costs two character slots rather than one, so leaving
          raw merge tags in the box will overstate the count.
        </p>
      </Callout>

      <h2>Where the rates come from</h2>

      <p>
        The Australian rate is the one STRONG studios are actually billed, taken
        from a full month of a studio&apos;s Twilio billing report. New Zealand,
        Singapore and the United States come from the GROW Variable Fees
        schedule that Hapana Account Management supplied in April 2025. That
        schedule was issued for another brand, and Hapana confirmed at the time
        that rates vary between regions, so treat those three as a guide and
        check them against a real invoice.
      </p>

      <p>
        Canada, the United Kingdom and Ireland have never been supplied. For
        those, take the rate straight off your Hapana invoice and enter it in
        the cost per segment box.
      </p>

      <Callout type="important" title="Two other things that get billed">
        <p>
          An inbound SMS costs the same as an outbound one, so a campaign that
          invites replies is charged in both directions. Inbound calls are
          charged at the same per minute rate as outbound. Both were confirmed
          by Hapana Account Management.
        </p>
      </Callout>
    </PageLayout>
  )
}
