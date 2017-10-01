import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Linking,
    Picker,
    Platform,
    Switch,

} from 'react-native';

import Label from '../components/Label';
import SettingStyle from '../styles/setting';

export default class TermOfUse extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <ScrollView style={SettingStyle.container}>
                <Label text="Term of Use"/>
                <View style={SettingStyle.box}>
                    <Text style={SettingStyle.text}>
                        Terms of Use

                        Effective date: October , 2017

                        By accessing or using the QuakeChat application, or any website made available by QuakeChat,
                        however accessed, you agree to be bound by these terms of use "Terms of Use". The Service is
                        owned or controlled by QuakeChat. These Terms of Use affect your legal rights and obligations.
                        If you do not agree to be bound by all of these Terms of Use, do not access or use the Service.

                        There may be times when we offer a special feature that has its own terms and conditions that
                        apply in addition to these Terms of Use. In those cases, the terms specific to the special
                        feature control to the extent there is a conflict with these Terms of Use.

                        ARBITRATION NOTICE: EXCEPT IF YOU OPT-OUT AND EXCEPT FOR CERTAIN TYPES OF DISPUTES DESCRIBED IN
                        THE ARBITRATION SECTION BELOW, YOU AGREE THAT DISPUTES BETWEEN YOU AND QuakeChat WILL BE
                        RESOLVED BY BINDING, INDIVIDUAL ARBITRATION AND YOU WAIVE YOUR RIGHT TO PARTICIPATE IN A CLASS
                        ACTION LAWSUIT OR CLASS-WIDE ARBITRATION.

                    </Text>
                    <Text style={SettingStyle.text}>
                        Basic Terms

                        1. You must be at least 13 years old to use the Service.

                        2. You may not post violent, nude, partially nude, discriminatory, unlawful, infringing,
                        hateful, pornographic or sexually suggestive photos or other content via the Service.

                        3. You are responsible for any activity that occurs through your account and you agree you will
                        not sell, transfer, license or assign your account, followers, username, or any account rights.
                        With the exception of people or businesses that are expressly authorized to create accounts on
                        behalf of their employers or clients, QuakeChat prohibits the creation of and you agree that you
                        will not create an account for anyone other than yourself. You also represent that all
                        information you provide or provided to QuakeChat upon registration and at all other times will
                        be true, accurate, current and complete and you agree to update your information as necessary to
                        maintain its truth and accuracy.

                        4. You agree that you will not solicit, collect or use the login credentials of other QuakeChat
                        users.

                        5. You are responsible for keeping your password secret and secure.

                        6. You must not defame, stalk, bully, abuse, harass, threaten, impersonate or intimidate people
                        or entities and you must not post private or confidential information via the Service,
                        including, without limitation, your or any other person's credit card information, social
                        security or alternate national identity numbers, non-public phone numbers or non-public email
                        addresses.

                        7. You may not use the Service for any illegal or unauthorized purpose. You agree to comply with
                        all laws, rules and regulations for example, federal, state, local and provincial applicable to
                        your use of the Service and your Content defined below, including but not limited to, copyright
                        laws.

                        8. You are solely responsible for your conduct and any data, text, files, information,
                        usernames, images, graphics, photos, profiles, audio and video clips, sounds, musical works,
                        works of authorship, applications, links and other content or materials collectively, "Content"
                        that you submit, post or display on or via the Service.

                        9. You must not change, modify, adapt or alter the Service or change, modify or alter another
                        website so as to falsely imply that it is associated with the Service or QuakeChat.

                        10. You must not create or submit unwanted email, comments, likes or other forms of commercial
                        or harassing communications to any QuakeChat users.

                        11. You must not use domain names or web URLs in your username without prior written consent
                        from QuakeChat.

                        12. You must not interfere or disrupt the Service or servers or networks connected to the
                        Service, including by transmitting any worms, viruses, spyware, malware or any other code of a
                        destructive or disruptive nature. You may not inject content or code or otherwise alter or
                        interfere with the way any QuakeChat page is rendered or displayed in a user's browser or
                        device.

                        13. You must comply with QuakeChat's Community Guidelines, available here:
                        http://treethe.world/legal/community/

                        14. You must not create accounts with the Service through unauthorized means, including but not
                        limited to, by using an automated device, script, bot, spider, crawler or scraper.

                        15. You must not attempt to restrict another user from using or enjoying the Service and you
                        must not encourage or facilitate violations of these Terms of Use or any other QuakeChat terms.

                        16. Violation of these Terms of Use may, in QuakeChat's sole discretion, result in termination
                        of your QuakeChat account. You understand and agree that QuakeChat cannot and will not be
                        responsible for the Content posted on the Service and you use the Service at your own risk. If
                        you violate the letter or spirit of these Terms of Use, or otherwise create risk or possible
                        legal exposure for QuakeChat, we can stop providing all or part of the Service to you.

                    </Text>
                    <Text style={SettingStyle.text}>
                        General Conditions

                        1. We reserve the right to modify or terminate the Service or your access to the Service for any
                        reason, without notice, at any time, and without liability to you. You can deactivate your
                        QuakeChat account by logging into the Service and completing the deactivation request form. If
                        we terminate your access to the Service or you use the form detailed above to deactivate your
                        account, your photos, comments, likes, friendships, and all other data will no longer be
                        accessible through your account, but those materials and data may persist and appear within the
                        Service.

                        2. Upon termination, all licenses and other rights granted to you in these Terms of Use will
                        immediately cease.

                        3. We reserve the right, in our sole discretion, to change these Terms of Use "Updated Terms"
                        from time to time. Unless we make a change for legal or administrative reasons, we will provide
                        reasonable advance notice before the Updated Terms become effective. You agree that we may
                        notify you of the Updated Terms by posting them on the Service, and that your use of the Service
                        after the effective date of the Updated Terms or engaging in such other conduct as we may
                        reasonably specify constitutes your agreement to the Updated Terms. Therefore, you should review
                        these Terms of Use and any Updated Terms before using the Service. The Updated Terms will be
                        effective as of the time of posting, or such later date as may be specified in the Updated
                        Terms, and will apply to your use of the Service from that point forward. These Terms of Use
                        will govern any disputes arising before the effective date of the Updated Terms.

                        4. We reserve the right to refuse access to the Service to anyone for any reason at any time.

                        5. We reserve the right to force forfeiture of any username for any reason.

                        6. We may, but have no obligation to, remove, edit, block, and/or monitor Content or accounts
                        containing Content that we determine in our sole discretion violates these Terms of Use.

                        7. You are solely responsible for your interaction with other users of the Service, whether
                        online or offline. You agree that QuakeChat is not responsible or liable for the conduct of any
                        user. QuakeChat reserves the right, but has no obligation, to monitor or become involved in
                        disputes between you and other users. Exercise common sense and your best judgment when
                        interacting with others, including when you submit or post Content or any personal or other
                        information.

                        8. There may be links from the Service, or from communications you receive from the Service, to
                        third-party web sites or features. There may also be links to third-party web sites or features
                        in images or comments within the Service. The Service also includes third-party content that we
                        do not control, maintain or endorse. Functionality on the Service may also permit interactions
                        between the Service and a third-party web site or feature, including applications that connect
                        the Service or your profile on the Service with a third-party web site or feature. For example,
                        the Service may include a feature that enables you to share Content from the Service or your
                        Content with a third party, which may be publicly posted on that third party's service or
                        application. Using this functionality typically requires you to login to your account on the
                        third-party service and you do so at your own risk. QuakeChat does not control any of these
                        third-party web services or any of their content. You expressly acknowledge and agree that
                        QuakeChat is in no way responsible or liable for any such third-party services or features. YOUR
                        CORRESPONDENCE AND BUSINESS DEALINGS WITH THIRD PARTIES FOUND THROUGH THE SERVICE ARE SOLELY
                        BETWEEN YOU AND THE THIRD PARTY. You may choose, at your sole and absolute discretion and risk,
                        to use applications that connect the Service or your profile on the Service with a third-party
                        service each, an "Application" and such Application may interact with, connect to or gather
                        and/or pull information from and to your Service profile. By using such Applications, you
                        acknowledge and agree to the following: if you use an Application to share information, you are
                        consenting to information about your profile on the Service being shared; your use of an
                        Application may cause personally identifying information to be publicly disclosed and/or
                        associated with you, even if QuakeChat has not itself provided such information; and your use of
                        an Application is at your own option and risk, and you will hold the QuakeChat Parties defined
                        below harmless for activity related to the Application.

                        9. You agree that you are responsible for all data charges you incur through use of the Service.

                        10. We prohibit crawling, scraping, caching or otherwise accessing any content on the Service
                        via automated means, including but not limited to, user profiles and photos except as may be the
                        result of standard search engine protocols or technologies used by a search engine with
                        QuakeChat's express consent.
                    </Text>
                    <Text style={SettingStyle.text}>
                        Rights

                        1. QuakeChat does not claim ownership of any Content that you post on or through the Service.
                        Instead, you hereby grant to QuakeChat a non-exclusive, fully paid and royalty-free,
                        transferable, sub-licensable, worldwide license to use the Content that you post on or through
                        the Service, subject to the Service's Privacy Policy, available here
                        http://treethe.world/legal/privacy/, including but not limited to sections 3 "Sharing of Your
                        Information", 4 "How We Store Your Information", and 5 "Your Choices About Your Information".

                        2. Some of the Service is supported by advertising revenue and may display advertisements and
                        promotions, and you hereby agree that QuakeChat may place such advertising and promotions on the
                        Service or on, about, or in conjunction with your Content. The manner, mode and extent of such
                        advertising and promotions are subject to change without specific notice to you.

                        3. You acknowledge that we may not always identify paid services, sponsored content, or
                        commercial communications as such.

                        4. You represent and warrant that: i you own the Content posted by you on or through the Service
                        or otherwise have the right to grant the rights and licenses set forth in these Terms of Use; ii
                        the posting and use of your Content on or through the Service does not violate, misappropriate
                        or infringe on the rights of any third party, including, without limitation, privacy rights,
                        publicity rights, copyrights, trademark and/or other intellectual property rights; iii you agree
                        to pay for all royalties, fees, and any other monies owed by reason of Content you post on or
                        through the Service; and iv you have the legal right and capacity to enter into these Terms of
                        Use in your jurisdiction.

                        5. The Service contains content owned or licensed by QuakeChat "QuakeChat Content". QuakeChat
                        Content is protected by copyright, trademark, patent, trade secret and other laws, and, as
                        between you and QuakeChat, QuakeChat owns and retains all rights in the QuakeChat Content and
                        the Service. You will not remove, alter or conceal any copyright, trademark, service mark or
                        other proprietary rights notices incorporated in or accompanying the QuakeChat Content and you
                        will not reproduce, modify, adapt, prepare derivative works based on, perform, display, publish,
                        distribute, transmit, broadcast, sell, license or otherwise exploit the QuakeChat Content.

                        6. The QuakeChat name and logo are trademarks of QuakeChat, and may not be copied, imitated or
                        used, in whole or in part, without the prior written permission of QuakeChat. In addition, all
                        page headers, custom graphics, button icons and scripts are service marks, trademarks and/or
                        trade dress of QuakeChat, and may not be copied, imitated or used, in whole or in part, without
                        prior written permission from QuakeChat.

                        7. Although it is QuakeChat's intention for the Service to be available as much as possible,
                        there will be occasions when the Service may be interrupted, including, without limitation, for
                        scheduled maintenance or upgrades, for emergency repairs, or due to failure of
                        telecommunications links and/or equipment. Also, QuakeChat reserves the right to remove any
                        Content from the Service for any reason, without prior notice. Content removed from the Service
                        may continue to be stored by QuakeChat, including, without limitation, in order to comply with
                        certain legal obligations, but may not be retrievable without a valid court order. Consequently,
                        QuakeChat encourages you to maintain your own backup of your Content. In other words, QuakeChat
                        is not a backup service and you agree that you will not rely on the Service for the purposes of
                        Content backup or storage. QuakeChat will not be liable to you for any modification, suspension,
                        or discontinuation of the Services, or the loss of any Content. You also acknowledge that the
                        Internet may be subject to breaches of security and that the submission of Content or other
                        information may not be secure.

                        8. You agree that QuakeChat is not responsible for, and does not endorse, Content posted within
                        the Service. QuakeChat does not have any obligation to prescreen, monitor, edit, or remove any
                        Content. If your Content violates these Terms of Use, you may bear legal responsibility for that
                        Content.

                        9. Except as otherwise described in the Service's Privacy Policy, available at
                        http://treethe.world/legal/privacy/ as between you and QuakeChat, any Content will be
                        non-confidential and non-proprietary and we will not be liable for any use or disclosure of
                        Content. You acknowledge and agree that your relationship with QuakeChat is not a confidential,
                        fiduciary, or other type of special relationship, and that your decision to submit any Content
                        does not place QuakeChat in a position that is any different from the position held by members
                        of the general public, including with regard to your Content. None of your Content will be
                        subject to any obligation of confidence on the part of QuakeChat, and QuakeChat will not be
                        liable for any use or disclosure of any Content you provide.

                        10. It is QuakeChat's policy not to accept or consider content, information, ideas, suggestions
                        or other materials other than those we have specifically requested and to which certain specific
                        terms, conditions and requirements may apply. This is to avoid any misunderstandings if your
                        ideas are similar to those we have developed or are developing independently. Accordingly,
                        QuakeChat does not accept unsolicited materials or ideas, and takes no responsibility for any
                        materials or ideas so transmitted. If, despite our policy, you choose to send us content,
                        information, ideas, suggestions, or other materials, you further agree that QuakeChat is free to
                        use any such content, information, ideas, suggestions or other materials, for any purposes
                        whatsoever, including, without limitation, developing and marketing products and services,
                        without any liability or payment of any kind to you.

                    </Text>
                    <Text style={SettingStyle.text}>
                        Reporting Copyright and Other IP Violations

                        1. We respect other people's rights, and expect you to do the same.

                        2. If you repeatedly infringe other people's intellectual property rights, we will disable your
                        account when appropriate.

                    </Text>
                    <Text style={SettingStyle.text}>
                        Disclaimer of Warranties

                        THE SERVICE, INCLUDING, WITHOUT LIMITATION, QuakeChat CONTENT, IS PROVIDED ON AN "AS IS", "AS
                        AVAILABLE" AND "WITH ALL FAULTS" BASIS. TO THE FULLEST EXTENT PERMISSIBLE BY LAW, NEITHER
                        QuakeChat NOR ITS PARENT COMPANY NOR ANY OF THEIR EMPLOYEES, MANAGERS, OFFICERS OR AGENTS
                        COLLECTIVELY, THE "QuakeChat PARTIES" MAKE ANY REPRESENTATIONS OR WARRANTIES OR ENDORSEMENTS OF
                        ANY KIND WHATSOEVER, EXPRESS OR IMPLIED, AS TO: A THE SERVICE; B THE QuakeChat CONTENT; C USER
                        CONTENT; OR D SECURITY ASSOCIATED WITH THE TRANSMISSION OF INFORMATION TO QuakeChat OR VIA THE
                        SERVICE. IN ADDITION, THE QuakeChat PARTIES HEREBY DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED,
                        INCLUDING, BUT NOT LIMITED TO, THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                        PURPOSE, NON-INFRINGEMENT, TITLE, CUSTOM, TRADE, QUIET ENJOYMENT, SYSTEM INTEGRATION AND FREEDOM
                        FROM COMPUTER VIRUS.

                        THE QuakeChat PARTIES DO NOT REPRESENT OR WARRANT THAT THE SERVICE WILL BE ERROR-FREE OR
                        UNINTERRUPTED; THAT DEFECTS WILL BE CORRECTED; OR THAT THE SERVICE OR THE SERVER THAT MAKES THE
                        SERVICE AVAILABLE IS FREE FROM ANY HARMFUL COMPONENTS, INCLUDING, WITHOUT LIMITATION, VIRUSES.
                        THE QuakeChat PARTIES DO NOT MAKE ANY REPRESENTATIONS OR WARRANTIES THAT THE INFORMATION
                        INCLUDING ANY INSTRUCTIONS ON THE SERVICE IS ACCURATE, COMPLETE, OR USEFUL. YOU ACKNOWLEDGE THAT
                        YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. THE QuakeChat PARTIES DO NOT WARRANT THAT YOUR USE
                        OF THE SERVICE IS LAWFUL IN ANY PARTICULAR JURISDICTION, AND THE QuakeChat PARTIES SPECIFICALLY
                        DISCLAIM SUCH WARRANTIES. SOME JURISDICTIONS LIMIT OR DO NOT ALLOW THE DISCLAIMER OF IMPLIED OR
                        OTHER WARRANTIES SO THE ABOVE DISCLAIMER MAY NOT APPLY TO YOU TO THE EXTENT SUCH JURISDICTION'S
                        LAW IS APPLICABLE TO YOU AND THESE TERMS OF USE.

                        BY ACCESSING OR USING THE SERVICE YOU REPRESENT AND WARRANT THAT YOUR ACTIVITIES ARE LAWFUL IN
                        EVERY JURISDICTION WHERE YOU ACCESS OR USE THE SERVICE.

                        THE QuakeChat PARTIES DO NOT ENDORSE CONTENT AND SPECIFICALLY DISCLAIM ANY RESPONSIBILITY OR
                        LIABILITY TO ANY PERSON OR ENTITY FOR ANY LOSS, DAMAGE WHETHER ACTUAL, CONSEQUENTIAL, PUNITIVE
                        OR OTHERWISE, INJURY, CLAIM, LIABILITY OR OTHER CAUSE OF ANY KIND OR CHARACTER BASED UPON OR
                        RESULTING FROM ANY CONTENT.

                    </Text>
                    <Text style={SettingStyle.text}>
                        Limitation of Liability; Waiver

                        UNDER NO CIRCUMSTANCES WILL THE QuakeChat PARTIES BE LIABLE TO YOU FOR ANY LOSS OR DAMAGES OF
                        ANY KIND INCLUDING, WITHOUT LIMITATION, FOR ANY DIRECT, INDIRECT, ECONOMIC, EXEMPLARY, SPECIAL,
                        PUNITIVE, INCIDENTAL OR CONSEQUENTIAL LOSSES OR DAMAGES THAT ARE DIRECTLY OR INDIRECTLY RELATED
                        TO: A THE SERVICE; B THE QuakeChat CONTENT; C USER CONTENT; D YOUR USE OF, INABILITY TO USE, OR
                        THE PERFORMANCE OF THE SERVICE; E ANY ACTION TAKEN IN CONNECTION WITH AN INVESTIGATION BY THE
                        QuakeChat PARTIES OR LAW ENFORCEMENT AUTHORITIES REGARDING YOUR OR ANY OTHER PARTY'S USE OF THE
                        SERVICE; F ANY ACTION TAKEN IN CONNECTION WITH COPYRIGHT OR OTHER INTELLECTUAL PROPERTY OWNERS;
                        G ANY ERRORS OR OMISSIONS IN THE SERVICE'S OPERATION; OR H ANY DAMAGE TO ANY USER'S COMPUTER,
                        MOBILE DEVICE, OR OTHER EQUIPMENT OR TECHNOLOGY INCLUDING, WITHOUT LIMITATION, DAMAGE FROM ANY
                        SECURITY BREACH OR FROM ANY VIRUS, BUGS, TAMPERING, FRAUD, ERROR, OMISSION, INTERRUPTION,
                        DEFECT, DELAY IN OPERATION OR TRANSMISSION, COMPUTER LINE OR NETWORK FAILURE OR ANY OTHER
                        TECHNICAL OR OTHER MALFUNCTION, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOST PROFITS, LOSS OF
                        GOODWILL, LOSS OF DATA, WORK STOPPAGE, ACCURACY OF RESULTS, OR COMPUTER FAILURE OR MALFUNCTION,
                        EVEN IF FORESEEABLE OR EVEN IF THE QuakeChat PARTIES HAVE BEEN ADVISED OF OR SHOULD HAVE KNOWN
                        OF THE POSSIBILITY OF SUCH DAMAGES, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE, STRICT
                        LIABILITY OR TORT INCLUDING, WITHOUT LIMITATION, WHETHER CAUSED IN WHOLE OR IN PART BY
                        NEGLIGENCE, ACTS OF GOD, TELECOMMUNICATIONS FAILURE, OR THEFT OR DESTRUCTION OF THE SERVICE. IN
                        NO EVENT WILL THE QuakeChat PARTIES BE LIABLE TO YOU OR ANYONE ELSE FOR LOSS, DAMAGE OR INJURY,
                        INCLUDING, WITHOUT LIMITATION, DEATH OR PERSONAL INJURY. SOME STATES DO NOT ALLOW THE EXCLUSION
                        OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION OR EXCLUSION MAY
                        NOT APPLY TO YOU. IN NO EVENT WILL THE QuakeChat PARTIES TOTAL LIABILITY TO YOU FOR ALL DAMAGES,
                        LOSSES OR CAUSES OR ACTION EXCEED ONE HUNDRED UNITED STATES DOLLARS $100.00.

                        YOU AGREE THAT IN THE EVENT YOU INCUR ANY DAMAGES, LOSSES OR INJURIES THAT ARISE OUT OF
                        QuakeChat'S ACTS OR OMISSIONS, THE DAMAGES, IF ANY, CAUSED TO YOU ARE NOT IRREPARABLE OR
                        SUFFICIENT TO ENTITLE YOU TO AN INJUNCTION PREVENTING ANY EXPLOITATION OF ANY WEB SITE, SERVICE,
                        PROPERTY, PRODUCT OR OTHER CONTENT OWNED OR CONTROLLED BY THE QuakeChat PARTIES, AND YOU WILL
                        HAVE NO RIGHTS TO ENJOIN OR RESTRAIN THE DEVELOPMENT, PRODUCTION, DISTRIBUTION, ADVERTISING,
                        EXHIBITION OR EXPLOITATION OF ANY WEB SITE, PROPERTY, PRODUCT, SERVICE, OR OTHER CONTENT OWNED
                        OR CONTROLLED BY THE QuakeChat PARTIES.

                        QuakeChat IS NOT RESPONSIBLE FOR THE ACTIONS, CONTENT, INFORMATION, OR DATA OF THIRD PARTIES,
                        AND YOU RELEASE US, OUR DIRECTORS, OFFICERS, EMPLOYEES, AND AGENTS FROM ANY CLAIMS AND DAMAGES,
                        KNOWN AND UNKNOWN, ARISING OUT OF OR IN ANY WAY CONNECTED WITH ANY CLAIM YOU HAVE AGAINST ANY
                        SUCH THIRD PARTIES.

                    </Text>
                    <Text style={SettingStyle.text}>
                        Indemnification

                        You and also any third party for whom you operate an account or activity on the Service agree to
                        defend at QuakeChat's request, indemnify and hold the QuakeChat Parties harmless from and
                        against any claims, liabilities, damages, losses, and expenses, including without limitation,
                        reasonable attorney's fees and costs, arising out of or in any way connected with any of the
                        following including as a result of your direct activities on the Service or those conducted on
                        your behalf: i your Content or your access to or use of the Service; ii your breach or alleged
                        breach of these Terms of Use; iii your violation of any third-party right, including without
                        limitation, any intellectual property right, publicity, confidentiality, property or privacy
                        right; iv your violation of any laws, rules, regulations, codes, statutes, ordinances or orders
                        of any governmental and quasi-governmental authorities, including, without limitation, all
                        regulatory, administrative and legislative authorities; or v any misrepresentation made by you.
                        You will cooperate as fully required by QuakeChat in the defense of any claim. QuakeChat
                        reserves the right to assume the exclusive defense and control of any matter subject to
                        indemnification by you, and you will not in any event settle any claim without the prior written
                        consent of
                        QuakeChat.

                    </Text>
                    <Text style={SettingStyle.text}>
                        Changes to This Terms and Conditions
                        I may update our Terms and Conditions from time to time. Thus, you are advised to review this
                        page periodically for any changes. I will notify you of any changes by posting the new Terms and
                        Conditions on this page. These changes are effective immediately after they are posted on this
                        page.

                    </Text>
                    <Text style={SettingStyle.text}>
                        Contact Us
                        If you have any questions or suggestions about my Terms and Conditions, do not hesitate to
                        contact me. pplflymoon2015@gmail.com

                    </Text>
                </View>

            </ScrollView>
        )
    }

}

