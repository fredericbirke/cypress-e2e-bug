using HotChocolate.Subscriptions;

namespace GraphQlBackend.GraphQlRootTypes;

public class Mutation
{
    public async Task<bool> TriggerSubscription(
        string someMessage,
        [Service] ITopicEventSender eventSender,
        CancellationToken ct
    )
    {
        await eventSender.SendAsync(Subscription.GetSomethingHappenedTopic(), someMessage, ct);
        return true;
    }
    
    public async Task<bool> UploadFile(
        IFile file,
        [Service] ITopicEventSender eventSender,
        CancellationToken ct
    )
    {
        return true;
    }
}